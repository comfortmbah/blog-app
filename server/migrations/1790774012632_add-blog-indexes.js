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
  pgm.createIndex("posts", "user_id");

  pgm.createIndex("post_categories", "category_id");

  pgm.createIndex("post_tags", "tag_id");

  pgm.createIndex("comments", "post_id");

  pgm.createIndex("comments", "user_id");

  pgm.createIndex("likes", "post_id");

  pgm.createIndex("bookmarks", "post_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropIndex("posts", "user_id");

  pgm.dropIndex("post_categories", "category_id");

  pgm.dropIndex("post_tags", "tag_id");

  pgm.dropIndex("comments", "post_id");

  pgm.dropIndex("comments", "user_id");

  pgm.dropIndex("likes", "post_id");

  pgm.dropIndex("bookmarks", "post_id");
};
