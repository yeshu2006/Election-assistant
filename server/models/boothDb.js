const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/booths.db');
const db = new Database(dbPath);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS booths (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    state TEXT,
    district TEXT,
    ac TEXT,
    latitude REAL,
    longitude REAL,
    ps_number TEXT,
    ps_name TEXT,
    web_url TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_coords ON booths (latitude, longitude);
  CREATE INDEX IF NOT EXISTS idx_ac ON booths (ac);
`);

module.exports = db;
