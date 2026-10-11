import pool from '../../config/db.js';

export const getAllCategories = async () => {
  const result = await pool.query(`
    SELECT id, name, slug, created_at, updated_at
    FROM categories
    ORDER BY name ASC
  `);

  return result.rows;
}

export const createCategory = async ({ name, slug }) => {
  const result = await pool.query(`
    INSERT INTO categories (name, slug)
    VALUES ($1, $2)
    RETURNING id, name, slug, created_at, updated_at
  `, [name, slug]);

  return result.rows[0];
}

export const updateCategory = async (id, { name, slug }) => {
  const result = await pool.query(`
    UPDATE categories
    SET name = $1, slug = $2,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id, name, slug, created_at, updated_at
  `, [name, slug, id]);

  return result.rows[0] || null;
}


export const deleteCategory = async (id) => {
  const result = await pool.query(`
    DELETE FROM categories
    WHERE id = $1
    RETURNING id, name, slug
  `, [id]);

  return result.rows[0] || null;
}