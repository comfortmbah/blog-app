import pool from "../../config/db.js";

export const getAllTags = async () => {
  const result = await pool.query(`
    SELECT id, name, slug, created_at, updated_at
    FROM tags
    ORDER BY name ASC
  `);

  return result.rows;
}