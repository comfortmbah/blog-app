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
  pgm.createTable("post_tags", {
    post_id: {
      type: "integer",
      notNull: true,
      references: "posts",
      onDelete: "CASCADE",
    },

    tag_id: {
      type: "integer",
      notNull: true,
      references: "tags",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("post_tags", "post_tags_pkey", {
    primaryKey: ["post_id", "tag_id"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("post_tags");
};
