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
  pgm.createTable("post_categories", {
    post_id: {
      type: "integer",
      notNull: true,
      references: "posts",
      onDelete: "CASCADE",
    },

    category_id: {
      type: "integer",
      notNull: true,
      references: "categories",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("post_categories", "post_categories_pkey", {
    primaryKey: ["post_id", "category_id"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("post_categories");
};
