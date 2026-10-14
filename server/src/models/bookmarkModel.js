import pool from '../../config/db.js';


export const createBookmark = async ({ userId, postId }) => {
  const result = await pool.query(`
    INSERT INTO bookmarks (user_id, post_id)
    VALUES ($1, $2)
    RETURNING user_id, post_id, created_at
  `, [userId, postId]);

  return result.rows[0];
}


export const removeBookmark = async ({ userId, postId}) => {
  const result = await pool.query(`
    DELETE FROM bookmarks
    WHERE user_id = $1
    AND post_id = $2
    RETURNING user_id, post_id
  `, [userId, postId]);

  return result.rows[0];
}


export const hasUserBookmarkedPost = async ({ userId, postId }) => {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM bookmarks
      WHERE user_id = $1
      AND post_id = $2
    ) AS bookmarked
  `, [userId, postId]);

  return result.rows[0].bookmarked;
}


export const getBookmarkedPostsByUserId = async (userId, { limit, offset }) => {
  const result = await pool.query(`
    SELECT p.*,
    b.created_at AS bookmarked_at
    FROM bookmarks b
    JOIN posts p
    ON p.id = b.post_id
    WHERE b.user_id = $1
    AND p.published = true
    AND p.deleted_at IS NULL
    ORDER BY b.created_at DESC,
    p.id DESC
    LIMIT $2
    OFFSET $3
  `, [userId, limit, offset]);

  return result.rows;
}


export const countBookmarkedPostsByUserId = async (userId) => {
  const result = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM bookmarks b
    JOIN posts p
    ON p.id = b.post_id
    WHERE b.user_id = $1
    AND p.published = true
    AND p.deleted_at IS NULL
  `, [userId]);

  return result.rows[0].total;
}