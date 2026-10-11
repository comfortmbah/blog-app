/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(` 
    INSERT INTO categories (name, slug)
    VALUES ('Technology', 'technology'), ('Programming', 'programming'), ('Database', 'database')
    ON CONFLICT (slug) DO NOTHING; `);

  pgm.sql(` 
    INSERT INTO tags (name, slug) 
    VALUES ('JavaScript', 'javascript'), ('Node.js', 'nodejs'), ('PostgreSQL', 'postgresql') 
    ON CONFLICT (slug) DO NOTHING; `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(` 
    DELETE FROM post_categories 
    WHERE category_id IN ( SELECT id FROM categories WHERE slug IN ('technology', 'programming', 'database') ); 
    DELETE FROM post_tags 
    WHERE tag_id IN ( SELECT id FROM tags WHERE slug IN ('javascript', 'nodejs', 'postgresql') ); 
    DELETE FROM categories 
    WHERE slug IN ('technology', 'programming', 'database'); 
    DELETE FROM tags 
    WHERE slug IN ('javascript', 'nodejs', 'postgresql'); 
    `);
};
