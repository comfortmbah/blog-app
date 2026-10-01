import pool from '../config/db.js';

export const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT * FROM posts
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
  `);

  return result.rows;
}