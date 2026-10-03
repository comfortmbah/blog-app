import pool from '../../config/db.js';

export const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT * FROM posts
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
  `);

  return result.rows;
}


export const getPostById = async (id) => {
  const result = await pool.query(`
    SELECT * FROM posts
    WHERE id = $1
    AND deleted_at IS NULL
  `, [id]);

  return result.rows[0];
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


export const updatePost = async ({ id, title, slug, content, published }) => {
  const result = await pool.query(`
    UPDATE posts
    SET 
    title = $1,
    slug = $2,
    content = $3,
    published = $4
    WHERE id = $5
    AND deleted_at IS NULL
    RETURNING *
  `, [title, slug, content, published, id]);

  return result.rows[0];
};   
