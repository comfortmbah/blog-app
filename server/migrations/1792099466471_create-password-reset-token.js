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
  pgm.createTable("password_reset_tokens", {
    id: {
      type: "integer",
      primaryKey: true,
      generated: "always",
      identity: "always",
    },

    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },

    token_hash: {
      type: "varchar(64)",
      notNull: true,
      unique: true,
    },

    expires_at: {
      type: "timestamptz",
      notNull: true,
    },

    used_at: {
      type: "timestamptz",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex("password_reset_tokens", "user_id");
  pgm.createIndex("password_reset_tokens", "expires_at");

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("password_reset_tokens");
};
