import pool from '../../config/db.js';

export const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT * FROM posts
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
  `);

  return result.rows;
}


export const createPost = async ({ userId, title, slug, content, published = false, }) => {
  const result = await pool.query(`
    INSERT INTO posts (
      user_id,
      title,
      slug,
      content,
      published
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [userId, title, slug, content, published]
  );

  return result.rows[0];
};
