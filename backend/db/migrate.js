const fs = require('fs');
const path = require('path');
const pg = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

/**
 * Format a Date object into an ISO local date-time string (YYYY-MM-DDTHH:mm)
 */
function formatLocalIso(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Generates sample appointments for today and the current week
 * to ensure the frontend scheduler (<ViewState defaultCurrentDate={new Date()} />)
 * immediately shows active appointments.
 */
function getCurrentSampleAppointments() {
  const now = new Date();
  
  // Today at 10:00 - 11:00
  const appt1Start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0);
  const appt1End = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0);

  // Today at 14:00 - 15:00
  const appt2Start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0);
  const appt2End = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0);

  // Tomorrow at 11:30 - 12:30
  const appt3Start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30);
  const appt3End = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 30);

  // In 2 days at 15:30 - 16:30
  const appt4Start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 15, 30);
  const appt4End = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 16, 30);

  return [
    {
      practitioner_id: 1,
      patient_id: 1,
      title: 'Initial Consultation - Cognitive Therapy',
      start_date: formatLocalIso(appt1Start),
      end_date: formatLocalIso(appt1End),
    },
    {
      practitioner_id: 3,
      patient_id: 2,
      title: 'Anxiety Assessment & Strategy Session',
      start_date: formatLocalIso(appt2Start),
      end_date: formatLocalIso(appt2End),
    },
    {
      practitioner_id: 5,
      patient_id: 3,
      title: 'Bipolar Support & Mindful Check-in',
      start_date: formatLocalIso(appt3Start),
      end_date: formatLocalIso(appt3End),
    },
    {
      practitioner_id: 4,
      patient_id: 4,
      title: 'Stress & Anger Management Coaching',
      start_date: formatLocalIso(appt4Start),
      end_date: formatLocalIso(appt4End),
    },
  ];
}

/**
 * Migrates database schemas and populates sample data.
 * 
 * @param {Object} [client] - Optional pg client or pg-mem instance. If omitted, connects via .env or initializes pg-mem.
 * @param {Object} [options] - Options { includeCurrentDates: true, verbose: true }
 * @returns {Promise<{ success: boolean, client: Object, stats: Object }>}
 */
async function migrateDatabase(client = null, options = {}) {
  const verbose = options.verbose !== false;
  const includeCurrentDates = options.includeCurrentDates !== false;
  const stats = { schemasRun: [], seedsRun: [], sampleAppointmentsAdded: 0 };

  const log = (...args) => {
    if (verbose) console.log(...args);
  };

  log('====================================================');
  log('  EndorphinFlow - Database Migration & Seeding Tool');
  log('====================================================');

  const schemaDir = path.join(__dirname, 'schema');
  const seedDir = path.join(__dirname, 'seeds');

  let activeClient = client;
  let isInMemory = false;
  let shouldCloseClient = false;

  // 1. Establish connection if client was not supplied
  if (!activeClient) {
    if (process.env.DB_HOST && process.env.DB_USER) {
      const connectionString =
        process.env.DATABASE_URL ||
        `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}?sslmode=disable`;

      log(`[Migrate] Attempting connection to PostgreSQL at ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}...`);
      const pgClient = new pg.Client({ connectionString });
      
      try {
        await pgClient.connect();
        activeClient = pgClient;
        shouldCloseClient = true;
        log(`[Migrate] Connected to PostgreSQL database "${process.env.DB_NAME}".`);
      } catch (err) {
        log(`[Migrate] PostgreSQL unreachable (${err.message}).`);
        log('[Migrate] Initializing in-memory PostgreSQL emulator (pg-mem)...');
        const { newDb } = require('pg-mem');
        const memDb = newDb();
        const memPg = memDb.adapters.createPg();
        const memClient = new memPg.Client();
        await memClient.connect();
        activeClient = memClient;
        isInMemory = true;
      }
    } else {
      log('[Migrate] No PostgreSQL credentials configured. Using in-memory database (pg-mem)...');
      const { newDb } = require('pg-mem');
      const memDb = newDb();
      const memPg = memDb.adapters.createPg();
      const memClient = new memPg.Client();
      await memClient.connect();
      activeClient = memClient;
      isInMemory = true;
    }
  }

  // 2. Run Schema Files in Order
  log('\n[Migrate] Step 1: Running schema migrations...');
  if (fs.existsSync(schemaDir)) {
    const schemaFiles = fs.readdirSync(schemaDir).sort();
    for (const filename of schemaFiles) {
      if (filename.endsWith('.sql')) {
        const filePath = path.join(schemaDir, filename);
        const sql = fs.readFileSync(filePath, 'utf8');
        await activeClient.query(sql);
        stats.schemasRun.push(filename);
        log(`  ✔ Schema applied: ${filename}`);
      }
    }
  } else {
    log(`  ⚠ Schema directory not found at: ${schemaDir}`);
  }

  // 3. Run Seed Files in Order
  log('\n[Migrate] Step 2: Populating sample seed data...');
  if (fs.existsSync(seedDir)) {
    const seedFiles = fs.readdirSync(seedDir).sort();
    for (const filename of seedFiles) {
      if (filename.endsWith('.sql')) {
        const filePath = path.join(seedDir, filename);
        const sql = fs.readFileSync(filePath, 'utf8');
        await activeClient.query(sql);
        stats.seedsRun.push(filename);
        log(`  ✔ Seed applied: ${filename}`);
      }
    }
  } else {
    log(`  ⚠ Seeds directory not found at: ${seedDir}`);
  }

  // 4. Inject current-date sample appointments for frontend calendar
  if (includeCurrentDates) {
    log('\n[Migrate] Step 3: Adding active sample appointments for current week...');
    const currentAppts = getCurrentSampleAppointments();
    for (const appt of currentAppts) {
      const insertQuery = {
        text: `INSERT INTO appointments (practitioner_id, patient_id, title, start_date, end_date) VALUES ($1, $2, $3, $4, $5)`,
        values: [appt.practitioner_id, appt.patient_id, appt.title, appt.start_date, appt.end_date],
      };
      await activeClient.query(insertQuery);
      stats.sampleAppointmentsAdded++;
      log(`  ✔ Added appointment: "${appt.title}" (${appt.start_date})`);
    }
  }

  // 5. Query verification
  try {
    const pracCount = await activeClient.query('SELECT COUNT(*) FROM practitioners');
    const patCount = await activeClient.query('SELECT COUNT(*) FROM patients');
    const apptCount = await activeClient.query('SELECT COUNT(*) FROM appointments');
    log('\n[Migrate] Migration verification:');
    log(`  - Practitioners available: ${pracCount.rows[0].count}`);
    log(`  - Patients available:      ${patCount.rows[0].count}`);
    log(`  - Total Appointments:      ${apptCount.rows[0].count}`);
  } catch (err) {
    log('  ⚠ Verification note:', err.message);
  }

  log('\n====================================================');
  log('  ✔ Database migration and sample seeding COMPLETE!');
  log('====================================================\n');

  if (shouldCloseClient && activeClient && typeof activeClient.end === 'function') {
    await activeClient.end();
  }

  return {
    success: true,
    isInMemory,
    client: activeClient,
    stats,
  };
}

// Allow direct CLI execution
if (require.main === module) {
  migrateDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Migrate] Fatal Error:', err);
      process.exit(1);
    });
}

module.exports = {
  migrateDatabase,
  getCurrentSampleAppointments,
};
