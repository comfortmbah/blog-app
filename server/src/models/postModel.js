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


export const createPost = async ({
  userId,
  title,
  slug,
  content,
  published = false,
  categoryIds = [],
  tagIds = [],
}) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const postResult = await client.query(
      `
        INSERT INTO posts (
          user_id,
          title,
          slug,
          content,
          published,
          published_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          CASE
            WHEN $5 = true THEN CURRENT_TIMESTAMP
            ELSE NULL
          END
        )
        RETURNING *
      `,
      [userId, title, slug, content, published]
    );

    const post = postResult.rows[0];

    for (const categoryId of categoryIds) {
      await client.query(
        `
          INSERT INTO post_categories (
            post_id,
            category_id
          )
          VALUES ($1, $2)
        `,
        [post.id, categoryId]
      );
    }

    for (const tagId of tagIds) {
      await client.query(
        `
          INSERT INTO post_tags (
            post_id,
            tag_id
          )
          VALUES ($1, $2)
        `,
        [post.id, tagId]
      );
    }

    const categoriesResult = await client.query(
      `
        SELECT c.id, c.name, c.slug
        FROM categories c
        JOIN post_categories pc
          ON pc.category_id = c.id
        WHERE pc.post_id = $1
        ORDER BY c.name ASC
      `,
      [post.id]
    );

    const tagsResult = await client.query(
      `
        SELECT t.id, t.name, t.slug
        FROM tags t
        JOIN post_tags pt
          ON pt.tag_id = t.id
        WHERE pt.post_id = $1
        ORDER BY t.name ASC
      `,
      [post.id]
    );

    await client.query('COMMIT');

    return {
      ...post,
      categories: categoriesResult.rows,
      tags: tagsResult.rows,
    };
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error(
        'Transaction rollback failed:',
        rollbackError
      );
    }

    throw error;
  } finally {
    client.release();
  }
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


export const getPostsByUserId = async (userId, { limit, offset, sortOrder, sortBy, search, status }) => {
  const result = await pool.query(` 
    SELECT * FROM posts
    WHERE user_id = $1
    AND deleted_at IS NULL
    AND (
      $2 = ''
      OR title ILIKE '%' || $2 || '%'
      OR content ILIKE '%' || $2 || '%'
    )
    AND (
      $3 = 'all'
      OR ($3 = 'published' AND published = true)
      OR ($3 = 'draft' AND published = false)
    )
    ORDER BY ${sortBy} ${sortOrder}, id DESC
    LIMIT $4
    OFFSET $5
  `, [userId, search, status, limit, offset]);

  return result.rows;
}

export const countPostsByUserId = async (userId, search = '', status = 'all') => {
  const result = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM posts
    WHERE user_id = $1
    AND deleted_at IS NULL
    AND (
      $2 = ''
      OR title ILIKE '%' || $2 || '%'
      OR content ILIKE '%' || $2 || '%'
    )
    AND (
      $3 = 'all'
      OR ($3 = 'published' AND published = true)
      OR ($3 = 'draft' AND published = false)
    )
  `, [userId, search, status]);

  return result.rows[0].total;
}