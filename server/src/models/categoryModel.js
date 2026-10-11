import pool from '../../config/db.js';

export const getAllCategories = async () => {
  const result = await pool.query(`
    SELECT id, name, slug, created_at, updated_at
    FROM categories
    ORDER BY name ASC
  `);

  return result.rows;
}