const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const db = require('./models/boothDb');
const { getChatResponse, verifyClaim } = require('./services/geminiService');
const { getLocalChatResponse } = require('./services/localChatService');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// AI Chat Endpoint - Using Local Knowledge Base
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    // Use Gemini API for "pro" responses
    const response = await getChatResponse(message, history);
    res.json({ response });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// Fake News Detector Endpoint
app.post('/api/verify', async (req, res) => {
  try {
    const { claim } = req.body;
    const result = await verifyClaim(claim);
    res.json(result);
  } catch (error) {
    console.error('Verify Error:', error);
    res.status(500).json({ error: 'Failed to verify claim' });
  }
});

// Polling Booths Endpoint (Search by lat/lng or AC)
app.get('/api/booths', (req, res) => {
  const { lat, lng, ac, limit = 10 } = req.query;
  
  try {
    let query, params;
    if (lat && lng) {
      // Find nearest booths using a simple distance square (for local SQLite, this is fine)
      query = `
        SELECT *, 
        ((latitude - ?) * (latitude - ?) + (longitude - ?) * (longitude - ?)) as distance
        FROM booths 
        ORDER BY distance ASC 
        LIMIT ?
      `;
      params = [lat, lat, lng, lng, limit];
    } else if (ac) {
      query = `SELECT * FROM booths WHERE ac LIKE ? LIMIT ?`;
      params = [`%${ac}%`, limit];
    } else {
      return res.status(400).json({ error: 'Provide lat/lng or ac' });
    }

    const booths = db.prepare(query).all(...params);
    res.json(booths);
  } catch (error) {
    console.error('Booths Error:', error);
    res.status(500).json({ error: 'Failed to fetch booths' });
  }
});

// Manifestos Endpoint
app.get('/api/manifestos', (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, '../MANIFESTATION.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Manifesto Error:', error);
    res.status(500).json({ error: 'Failed to load manifestos' });
  }
});

// Candidates API (MyNeta Integration)
app.get('/api/candidates', async (req, res) => {
  const { type, state, year = '2024', constituency } = req.query;
  
  try {
    // Format state name for the API (e.g., "Uttar Pradesh" -> "uttar_pradesh")
    let formattedState = state ? state.toLowerCase().replace(/\s+/g, '_') : '';
    
    // API Specific Mappings
    const stateMapping = {
      'chhattisgarh': 'chattisgarh', // API uses two 't's
      'dadra_and_nagar_haveli_and_daman_and_diu': 'dadra_and_nagar_haveli', // API might use shorter name
      'andaman_and_nicobar_islands': 'andaman_and_nicobar'
    };

    if (stateMapping[formattedState]) {
      formattedState = stateMapping[formattedState];
    }
    
    let url;
    if (type === 'mps') {
      // Use state-specific MP endpoint if state is provided
      url = formattedState 
        ? `https://nish.space/my_neta/mps/${year}/${formattedState}`
        : `https://nish.space/my_neta/mps/${year}`;
    } else if (type === 'mlas') {
      if (!formattedState) return res.status(400).json({ error: 'State is required for MLAs' });
      url = `https://nish.space/my_neta/mlas/${formattedState}`;
    } else {
      return res.status(400).json({ error: 'Invalid parameters for candidates' });
    }

    console.log(`Fetching candidates from: ${url}`);
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'VoteSmartIndiaAI/1.0' }
    });
    
    let rawData = response.data;
    let candidatesList = [];

    // Extract the correct array based on type
    if (type === 'mps' && rawData.mps) {
      candidatesList = rawData.mps;
    } else if (type === 'mlas' && rawData.mlas) {
      candidatesList = rawData.mlas;
    } else if (Array.isArray(rawData)) {
      candidatesList = rawData;
    } else if (rawData && typeof rawData === 'object') {
      // Some versions of the API might return the array directly under the state name or similar
      candidatesList = rawData.mlas || rawData.mps || Object.values(rawData).find(val => Array.isArray(val)) || [];
    }

    console.log(`Found ${candidatesList.length} candidates before filtering`);

    // Filter by constituency if provided
    if (constituency && candidatesList.length > 0) {
      const searchTerms = constituency.toLowerCase().trim().split(/\s+/);
      candidatesList = candidatesList.filter(c => {
        const cName = c.constituency?.toLowerCase().trim() || '';
        return searchTerms.every(term => cName.includes(term));
      });
    }

    console.log(`Returning ${candidatesList.length} candidates after filtering`);
    res.json(candidatesList);
  } catch (error) {
    console.error('Candidates API Error:', error.response?.status, error.message);
    
    // Fallback logic for MPs
    if (type === 'mps' && state) {
       try {
         const fallbackUrl = `https://nish.space/my_neta/mps/${year}`;
         const response = await axios.get(fallbackUrl, { headers: { 'User-Agent': 'VoteSmartIndiaAI/1.0' } });
         let rawData = response.data;
         let candidatesList = rawData.mps || [];
         
         candidatesList = candidatesList.filter(c => 
           c.state_or_ut?.toLowerCase().replace(/\s+/g, '_') === state.toLowerCase().replace(/\s+/g, '_')
         );
         
         if (constituency) {
           candidatesList = candidatesList.filter(c => 
             c.constituency?.toLowerCase().trim().includes(constituency.toLowerCase().trim())
           );
         }
         return res.json(candidatesList);
       } catch (fallbackError) {
         console.error('Fallback fetch failed:', fallbackError.message);
       }
    }
    
    // Return empty array instead of 500 to keep the UI workable
    res.json([]);
  }
});

// Geocoding Proxy (Using Public OpenStreetMap Nominatim)
app.post('/api/geocode', async (req, res) => {
  const { address } = req.body;
  
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'VoteSmartIndiaAI/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      const first = response.data[0];
      res.json({
        status: 'OK',
        results: [{
          geometry: {
            location: {
              lat: parseFloat(first.lat),
              lng: parseFloat(first.lon)
            }
          },
          formatted_address: first.display_name
        }]
      });
    } else {
      res.json({ status: 'ZERO_RESULTS' });
    }
  } catch (error) {
    console.error('Geocode Error:', error);
    res.status(500).json({ error: 'Geocoding failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
