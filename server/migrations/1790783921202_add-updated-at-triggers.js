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
    CREATE OR REPLACE FUNCTION
    update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  const tables = ["users", "posts", "categories", "tags", "comments"];

  tables.forEach((table) => {
    pgm.sql(`
      CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW
      EXECUTE FUNCTION
      update_updated_at();
    `);
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  const tables = ["users", "posts", "categories", "tags", "comments"];

  tables.forEach((table) => {
    pgm.sql(`
      DROP TRIGGER IF EXISTS 
      ${table}_updated_at
      ON ${table}
    `);
  });

  pgm.sql(`
    DROP FUNCTION IF EXISTS
    update_updated_at();
  `);
};
