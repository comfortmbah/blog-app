import pool from "../../config/db.js";


export const createUser = async ({ name, email, passwordHash }) => {
  const result = await pool.query(`
    INSERT INTO users ( name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, role, created_at, updated_at
  `, [name, email, passwordHash]);

  return result.rows[0];
}

export const findUserByEmail = async (email) => {
  const result = await pool.query(`
    SELECT id, name, email, password_hash, role
    FROM users
    WHERE LOWER(email) = LOWER($1)
    AND deleted_at IS NULL
  `, [email]);

  return result.rows[0];
}


export const findUserById = async (id) => {
  const result = await pool.query(`
    SELECT id, name, email, role
    FROM users
    WHERE id = $1
    AND deleted_at IS NULL
  `, [id]);

  return result.rows[0];
};