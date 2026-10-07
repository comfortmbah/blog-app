import pool from '../../config/db.js';

export const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT * FROM posts
    WHERE deleted_at IS NULL
    AND published = true
    ORDER BY created_at DESC
  `);

  return result.rows;
}


export const getMyPosts = async (userId) => {
  const result = await pool.query(`
    SELECT * FROM posts
    WHERE user_id = $1
    AND deleted_at IS NULL
    ORDER BY created_at DESC
  `, [userId]);

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
      published,
      published_at
    )
    VALUES ($1, $2, $3, $4, $5,
    CASE
    WHEN $5 = true
    THEN CURRENT_TIMESTAMP
    ELSE NULL
    END
    )
    RETURNING *`,
    [userId, title, slug, content, published]
  );

  return result.rows[0];
};


export const updatePost = async ({ id, title, slug, content, published }) => {
  const result = await pool.query(`
    UPDATE posts
    SET 
    title = COALESCE($1, title),
    slug = COALESCE($2, slug),
    content = COALESCE($3, content),
    published = COALESCE($4, published),
    published_at = CASE
    WHEN $4 = true 
    AND published = false
    THEN CURRENT_TIMESTAMP
    WHEN $4 = false 
    THEN NULL 
    ELSE published_at
    END
    WHERE id = $5
    AND deleted_at IS NULL
    RETURNING *
  `, [title, slug, content, published, id]);

  return result.rows[0];
};  

export const softDeletePost = async (id) => {
  const result = await pool.query(`
    UPDATE posts
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = $1
    AND deleted_at IS NULL
    RETURNING *
  `, [id]);

  return result.rows[0];
};


export const getPublishedPostById = async (id) => {
  const result = await pool.query(`
    SELECT * FROM posts 
    WHERE id = $1
    AND deleted_at IS NULL
    AND published = true
  `, [id]);

  return result.rows[0];
};


export const getPostsByUserId = async (userId, { limit, offset, sortOrder }) => {
  const result = await pool.query(` 
    SELECT * FROM posts
    WHERE user_id = $1
    AND deleted_at IS NULL
    ORDER BY created_at ${sortOrder}
    LIMIT $2
    OFFSET $3
  `, [userId, limit, offset]);

  return result.rows;
}

export const countPostsByUserId = async (userId) => {
  const result = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM posts
    WHERE user_id = $1
    AND deleted_at IS NULL
  `, [userId]);

  return result.rows[0].total;
}