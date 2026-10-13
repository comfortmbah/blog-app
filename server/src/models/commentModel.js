import pool from "../../config/db.js";

// Create a comment
export const createComment = async ({
  postId,
  userId,
  content,
}) => {
  const result = await pool.query(
    `
      INSERT INTO comments (
        post_id,
        user_id,
        content
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [postId, userId, content] 
  );

  return result.rows[0];
};

// Get comments for a published, non-deleted post
export const getCommentsByPostId = async ({
  postId,
  limit,
  offset,
}) => {
  const result = await pool.query(
    `
      SELECT
        c.id,
        c.post_id,
        c.user_id,
        c.content,
        c.created_at,
        c.updated_at
      FROM comments c
      JOIN posts p
        ON p.id = c.post_id
      WHERE c.post_id = $1
        AND p.published = true
        AND p.deleted_at IS NULL
      ORDER BY c.created_at ASC, c.id ASC
      LIMIT $2
      OFFSET $3
    `,
    [postId, limit, offset]
  );

  return result.rows;
};

// Find a comment by its ID
export const getCommentById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM comments
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};