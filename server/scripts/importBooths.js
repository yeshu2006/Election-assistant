const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Booth = require('../models/Booth');

const csvPath = path.resolve(__dirname, '../../POOILING DATA.csv');

async function importData() {
  if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Optional: Clear existing data before import to avoid duplicates
    await Booth.deleteMany({});
    console.log('Cleared existing booths.');

    console.log('Starting import from:', csvPath);

    let count = 0;
    let buffer = [];
    const BATCH_SIZE = 1000;

    const processBuffer = async () => {
      if (buffer.length > 0) {
        await Booth.insertMany(buffer, { ordered: false });
        count += buffer.length;
        process.stdout.write(`Imported ${count} rows...\r`);
        buffer = [];
      }
    };

    const stream = fs.createReadStream(csvPath).pipe(csv());

    for await (const row of stream) {
      const lat = parseFloat(row.Latitude);
      const lng = parseFloat(row.Longitude);

      // Only add valid coordinates
      if (!isNaN(lat) && !isNaN(lng)) {
        buffer.push({
          state: row.State,
          district: row.District,
          ac: row.AC,
          ps_number: row.PSNumber,
          ps_name: row.PSName,
          web_url: row.WebURL,
          location: {
            type: 'Point',
            coordinates: [lng, lat] // GeoJSON expects [longitude, latitude]
          }
        });
      }

      if (buffer.length >= BATCH_SIZE) {
        // Pause stream to let DB catch up
        stream.pause();
        await processBuffer();
        stream.resume();
      }
    }

    // Process remaining buffer
    await processBuffer();

    console.log(`\nImport complete! Successfully inserted ${count} booths into MongoDB.`);
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\nError during import:', error);
    mongoose.disconnect();
    process.exit(1);
  }
}

importData();
