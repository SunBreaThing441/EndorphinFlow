const pg = require('pg');
require('dotenv').config();
const { migrateDatabase } = require('./migrate');

let client;
let migrationPromise = null;
let isRealPg = false;

function initPgMem() {
  console.log('[DB] Initializing in-memory PostgreSQL emulator (pg-mem)...');
  const { newDb } = require('pg-mem');
  const db = newDb();
  const memPg = db.adapters.createPg();
  const memClient = new memPg.Client();
  memClient.connect();

  migrationPromise = migrateDatabase(memClient, { verbose: false });
  client = memClient;
  isRealPg = false;
  return memClient;
}

async function resetDatabase() {
  if (isRealPg && client) {
    return await migrateDatabase(client, { verbose: true });
  }
  initPgMem();
  await migrationPromise;
  return {
    success: true,
    message: 'Database reset and sample data populated successfully',
  };
}

if (process.env.DB_HOST && process.env.DB_USER) {
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}?sslmode=disable`;
  const pgClient = new pg.Client({
    connectionString: connectionString || process.env.DATABASE_URL,
  });

  pgClient.on('error', (err) => {
    console.warn('[DB] PostgreSQL error:', err.message);
    if (!client) {
      client = initPgMem();
    }
  });

  pgClient.connect((err) => {
    if (err) {
      console.warn(`[DB] Could not connect to PostgreSQL on ${process.env.DB_HOST}:${process.env.DB_PORT || 5432} (${err.message}).`);
      console.log('[DB] Falling back to in-memory database with sample data...');
      client = initPgMem();
    } else {
      console.log(`[DB] Connected to PostgreSQL ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
      client = pgClient;
      isRealPg = true;
    }
  });

  module.exports = {
    query: async (...args) => {
      if (!client) {
        client = initPgMem();
      }
      if (migrationPromise) {
        await migrationPromise;
      }
      return client.query(...args);
    },
    resetDatabase,
  };
} else {
  client = initPgMem();
  module.exports = {
    query: async (...args) => {
      if (migrationPromise) {
        await migrationPromise;
      }
      return client.query(...args);
    },
    resetDatabase,
  };
}
