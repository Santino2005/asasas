const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function runMigration() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✓ Connected to database');

    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'migrations', '001_create_assessment_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Split by semicolon and filter out empty statements
    const statements = migrationSQL.split(';').filter(stmt => stmt.trim());

    console.log(`Running ${statements.length} SQL statements...`);

    for (const statement of statements) {
      console.log(`  → ${statement.substring(0, 60)}...`);
      await client.query(statement);
    }

    console.log('✓ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
