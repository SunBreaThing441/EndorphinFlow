// Database reset script - uses the migration and seeding module
const { migrateDatabase } = require('./migrate');

migrateDatabase()
  .then(() => {
    console.log('[db:reset] Database reset and seeded successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[db:reset] Failed to reset database:', err);
    process.exit(1);
  });
