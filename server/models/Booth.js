const mongoose = require('mongoose');

const boothSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  ac: { type: String, required: true },
  ps_number: { type: String },
  ps_name: { type: String },
  web_url: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true // [longitude, latitude]
    }
  }
});

// Index for Geospatial queries (searching by distance)
boothSchema.index({ location: '2dsphere' });

// Index for fast text searches by Assembly Constituency (AC)
boothSchema.index({ ac: 1 });

module.exports = mongoose.model('Booth', boothSchema);
