import pool from '../../config/db.js';

export const createLike = async ({ userId, postId }) => {
  const result = await pool.query(
    `
    INSERT INTO likes (user_id, post_id)
    VALUES ($1, $2)
    RETURNING user_id, post_id, created_at;
  `,
    [userId, postId]
  );

  return result.rows[0];
};

export const removeLike = async ({ userId, postId }) => {
  const result = await pool.query(`
    DELETE FROM likes 
    WHERE user_id = $1
    AND post_id = $2
    RETURNING user_id, post_id
  `, [userId, postId]);

  return result.rows[0];
}

export const countLikesByPostId = async (postId) => {
  const result = await pool.query(`
    SELECT COUNT(*) AS total
    FROM likes
    WHERE post_id = $1
  `, [postId]);

  return Number(result.rows[0].total);
}

export const hasUserLikedPost = async ({ userId, postId }) => {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM likes
      WHERE user_id = $1
      AND post_id = $2
    ) AS liked
  `, [userId, postId]);

  return result.rows[0].liked;
}


export const getLikedPostsByUserId = async (userId, { limit, offset }) => {
  const result = await pool.query(`
    SELECT p.*,
    l.created_at AS liked_at
    FROM likes l
    JOIN posts p
    ON p.id = l.post_id
    WHERE l.user_id = $1
    AND p.published = true
    AND p.deleted_at IS NULL
    ORDER BY l.created_at DESC,
    p.id DESC
    LIMIT $2
    OFFSET $3
  `, [userId, limit, offset]);

  return result.rows;
};


export const countLikedPostsByUserId = async (userId) => {
  const result = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM likes l
    JOIN posts p
    ON p.id = l.post_id
    WHERE l.user_id = $1
    AND p.published = true
    AND p.deleted_at IS NULL
  `, [userId]);

  return result.rows[0].total;
}