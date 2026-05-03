const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../models/boothDb');

const csvPath = path.resolve(__dirname, '../../POOILING DATA.csv');

async function importData() {
  console.log('Starting import from:', csvPath);
  
  const insert = db.prepare(`
    INSERT INTO booths (state, district, ac, latitude, longitude, ps_number, ps_name, web_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      insert.run(
        row.State,
        row.District,
        row.AC,
        parseFloat(row.Latitude) || 0,
        parseFloat(row.Longitude) || 0,
        row.PSNumber,
        row.PSName,
        row.WebURL
      );
    }
  });

  let count = 0;
  let buffer = [];
  const BATCH_SIZE = 1000;

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      buffer.push(row);
      if (buffer.length >= BATCH_SIZE) {
        insertMany(buffer);
        count += buffer.length;
        process.stdout.write(`Imported ${count} rows...\r`);
        buffer = [];
      }
    })
    .on('end', () => {
      if (buffer.length > 0) {
        insertMany(buffer);
        count += buffer.length;
      }
      console.log(`\nImport complete. Total rows: ${count}`);
      process.exit(0);
    })
    .on('error', (err) => {
      console.error('Error during import:', err);
      process.exit(1);
    });
}

importData();
