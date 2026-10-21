import pool from "../../config/db.js";


export const createPasswordResetToken = async ({ userId, tokenHash, expiresAt }) => {
  const result = await pool.query(`
    INSERT INTO password_reset_tokens ( user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, expires_at, created_at
  `, [userId, tokenHash, expiresAt]);

  return result.rows[0];
}


export const findValidPasswordResetToken = async (tokenHash) => {
  const result = await pool.query(`
    SELECT id, user_id, expires_at, used_at
    FROM password_reset_tokens
    WHERE token_hash = $1
    AND expires_at > CURRENT_TIMESTAMP
    AND used_at IS NULL
    LIMIT 1
  `, [tokenHash]);

  return result.rows[0] || null;
}


export const markPasswordResetTokenAsUsed = async (id) => {
  const result = await pool.query(`
    UPDATE password_reset_tokens 
    SET used_at = CURRENT_TIMESTAMP
    WHERE id = $1
    AND used_at IS NULL
    RETURNING id, used_at
  `, [id]);

  return result.rows[0] || null;
}


export const deleteExpiredPasswordResetTokens = async () => {
  const result = await pool.query(`
    DELETE FROM password_reset_tokens
    WHERE expires_at <= CURRENT_TIMESTAMP
    RETURNING id
  `);

  return result.rowCount;
}


export const invalidatePasswordResetTokens = async (userId) => {
  const result = await pool.query(
    `
      UPDATE password_reset_tokens
      SET used_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
        AND used_at IS NULL
        AND expires_at > CURRENT_TIMESTAMP
      RETURNING id
    `,
    [userId]
  );

  return result.rowCount;
};


export const completePasswordReset = async ({ tokenHash, passwordHash }) => {
  const client = await pool.connect();

  let transactionStarted = false;

  try {
    await client.query("BEGIN");
    transactionStarted = true;

    const tokenResult = await client.query(`
      SELECT id, user_id
      FROM password_reset_tokens
      WHERE token_hash = $1
      AND expires_at > CURRENT_TIMESTAMP
      AND used_at IS NULL
      LIMIT 1
      FOR UPDATE
    `, [tokenHash]);

    const resetToken = tokenResult.rows[0];

    if (!resetToken) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return null;
    }

    const userResult = await client.query(`
      SELECT id 
      FROM users
      WHERE id = $1
      AND deleted_at IS NULL
      FOR UPDATE
    `, [resetToken.user_id]);

    if (userResult.rowCount === 0) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return null;
    }

    const passwordResult = await client.query(`
      UPDATE users
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      AND deleted_at IS NULL
      RETURNING id
    `, [passwordHash, resetToken.user_id]); 

    if (passwordResult.rowCount === 0) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return null;
    }

    const usedTokenResult = await client.query(`
      UPDATE password_reset_tokens
      SET used_at = CURRENT_TIMESTAMP
      WHERE id = $1
      AND used_at IS NULL
      AND expires_at > CURRENT_TIMESTAMP
      RETURNING id
    `, [resetToken.id]);

    if (usedTokenResult.rowCount === 0) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return null;
    }

    // Invalidate other outstanding reset tokens
    await client.query(`
      UPDATE password_reset_tokens
      SET used_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      AND id <> $2
      AND used_at IS NULL
    `, [resetToken.user_id, resetToken.id]);


    await client.query("COMMIT");
    transactionStarted = false;

    return { userId: resetToken.user_id, }
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Password reset transaction rollback failed:", rollbackError.message);
      }
    }

    throw error;
  } finally {
    client.release();
  }
}