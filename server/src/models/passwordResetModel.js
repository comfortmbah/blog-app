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