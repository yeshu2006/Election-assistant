import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Chip, LinearProgress, 
  Avatar, TextField, MenuItem, Button, InputAdornment, Alert, 
  Tabs, Tab, Divider, Container, Skeleton
} from '@mui/material';
import Security from '@mui/icons-material/Security';
import School from '@mui/icons-material/School';
import AccountBalance from '@mui/icons-material/AccountBalance';
import Gavel from '@mui/icons-material/Gavel';
import Search from '@mui/icons-material/Search';
import LocationOn from '@mui/icons-material/LocationOn';
import Stars from '@mui/icons-material/Stars';
import Assignment from '@mui/icons-material/Assignment';
import axios from 'axios';
import ManifestoCard from '../components/ManifestoCard';
import { API_BASE_URL } from '../config';

const calculateTransparencyScore = (candidate) => {
  if (!candidate) return 0;
  let score = 50; 
  const cases = parseInt(candidate.criminal_cases) || 0;
  score -= Math.min(cases * 15, 45); 

  const edu = candidate.education?.toLowerCase() || '';
  if (edu.includes('doctorate') || edu.includes('phd')) score += 25;
  else if (edu.includes('post graduate')) score += 20;
  else if (edu.includes('graduate')) score += 15;
  else if (edu.includes('12th')) score += 5;

  if (candidate.assets && candidate.liabilities) score += 20;
  else if (candidate.assets) score += 10;

  return Math.min(Math.max(score, 0), 100);
};

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [manifestos, setManifestos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState({
    type: 'mps',
    state: 'Delhi',
    constituency: ''
  });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchManifestos();
  }, []);

  const fetchManifestos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/manifestos`);
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setManifestos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch manifestos', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { type, state, constituency } = searchState;
      const res = await axios.get(`${API_BASE_URL}/api/candidates`, {
        params: { type, state, constituency }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setCandidates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch candidates', error);
    } finally {
      setLoading(false);
    }
  };

  const getManifestoForParty = (party) => {
    if (!party) return null;
    const stateManifesto = manifestos.find(m => m.state?.toLowerCase() === searchState.state?.toLowerCase());
    if (!stateManifesto) return null;
    return (stateManifesto.parties || []).find(p => p.party?.toLowerCase() === party.toLowerCase() || party.toLowerCase().includes(p.party?.toLowerCase()))?.manifesto;
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>Lokm Pro: Candidate Explorer</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Search by constituency to see candidate profiles, transparency scores, and party manifestos.
      </Typography>
      
      <Card sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Election Type"
              value={searchState.type}
              onChange={(e) => setSearchState({...searchState, type: e.target.value})}
            >
              <MenuItem value="mps">Lok Sabha (MP)</MenuItem>
              <MenuItem value="mlas">Vidhan Sabha (MLA)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="State / Union Territory"
              value={searchState.state}
              onChange={(e) => setSearchState({...searchState, state: e.target.value})}
            >
              {[
                'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
                'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 
                'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 
                'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
                'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 
                'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
              ].map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Constituency (e.g. Chandni Chowk)"
              value={searchState.constituency}
              onChange={(e) => setSearchState({...searchState, constituency: e.target.value})}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LocationOn color="action" /></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="contained" 
              size="large" 
              onClick={handleSearch}
              disabled={loading}
              sx={{ height: 56, borderRadius: 3 }}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {candidates.length > 0 ? (
        <Grid container spacing={3}>
          {candidates.map((c, i) => {
            const score = calculateTransparencyScore(c);
            const manifesto = getManifestoForParty(c.party);
            return (
              <Grid item xs={12} key={i}>
                <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {/* Left: Basic Info */}
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, fontSize: '1.5rem' }}>
                            {c.name?.[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>{c.name}</Typography>
                            <Chip label={c.party} size="small" color="primary" sx={{ mt: 0.5, fontWeight: 700 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {c.constituency}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Gavel color={c.criminal_cases > 0 ? 'error' : 'success'} fontSize="small" />
                            <Typography variant="body2">Criminal Cases: <b>{c.criminal_cases || 0}</b></Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <School color="action" fontSize="small" />
                            <Typography variant="body2">Education: <b>{c.education || 'Not Disclosed'}</b></Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccountBalance color="action" fontSize="small" />
                            <Typography variant="body2">Assets: <b>₹{c.assets || '0'}</b></Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Right: Scores & Manifesto */}
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Stars color="secondary" /> Transparency Index
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: 900 }} color={score > 70 ? 'secondary.main' : score > 40 ? 'warning.main' : 'error.main'}>
                            {score}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={score} 
                          sx={{ 
                            height: 10, 
                            borderRadius: 5, 
                            bgcolor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: score > 70 ? 'secondary.main' : score > 40 ? 'warning.main' : 'error.main'
                            }
                          }} 
                        />
                        
                        <ManifestoCard manifesto={manifesto} partyName={c.party} />
                        
                        {!manifesto && (
                          <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                            Generic party manifesto data not found for {c.party} in {searchState.state}.
                          </Alert>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(3)).map((_, i) => (
            <Grid item xs={12} key={`skeleton-${i}`}>
              <Card sx={{ borderRadius: 4, p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Skeleton variant="circular" width={64} height={64} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="80%" height={32} />
                        <Skeleton variant="text" width="40%" height={24} />
                      </Box>
                    </Box>
                    <Skeleton variant="text" width="100%" height={20} sx={{ mt: 3 }} />
                    <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2 }} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'background.paper', borderRadius: 4 }}>
          <Search sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">Enter a constituency and hit search to explore candidates.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Candidates;
