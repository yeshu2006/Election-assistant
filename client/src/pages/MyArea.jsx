import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Grid, 
  Card, CardContent, List, ListItem, ListItemText, 
  Divider, Alert, Container, Paper, Stack,
  useTheme, CircularProgress, Skeleton
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';
import LocationOn from '@mui/icons-material/LocationOn';
import OpenInNew from '@mui/icons-material/OpenInNew';
import HowToVote from '@mui/icons-material/HowToVote';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const MyArea = () => {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState(null);
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleSearch = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const geoRes = await axios.post(`${API_BASE_URL}/api/geocode`, { address });
      if (geoRes.data.status === 'OK') {
        const { lat, lng } = geoRes.data.results[0].geometry.location;
        setResults({
          lat,
          lng,
          formatted: geoRes.data.results[0].formatted_address
        });

        const boothRes = await axios.get(`${API_BASE_URL}/api/booths?lat=${lat}&lng=${lng}`);
        const data = Array.isArray(boothRes.data) ? boothRes.data : (boothRes.data?.data || []);
        setBooths(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
      {/* Header Section - Centered */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            width: 60, height: 60, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            mx: 'auto', mb: 3, borderRadius: 0 
          }}>
            <LocationOn sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 950, mb: 2, letterSpacing: -1 }}>
            Find Your Polling Booth
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Enter your location to find the nearest election polling stations. 
            Official data provided by the Election Commission.
          </Typography>
        </motion.div>
      </Box>

      {/* Search Container - Centered */}
      <Box sx={{ maxWidth: 800, mx: 'auto', mb: 10 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 0, 
            border: '1px solid', 
            borderColor: 'divider',
            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Enter village, city, or locality (e.g. Rohini Sector 7, Delhi)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleSearch} 
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
              sx={{ minWidth: 160, borderRadius: 0, fontWeight: 900 }}
            >
              {loading ? 'Searching' : 'Find Booth'}
            </Button>
          </Stack>
        </Paper>
      </Box>

      {results && (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid', borderColor: 'primary.main', bgcolor: 'transparent' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 2 }}>Detected Location</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, mb: 3 }}>{results.formatted}</Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Searching within a 5km radius of your area for active polling stations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <HowToVote color="primary" /> Nearby Polling Booths ({booths.length})
            </Typography>
            
            <Stack spacing={2}>
              {loading ? (
                Array.from(new Array(3)).map((_, i) => (
                  <Card key={`skeleton-${i}`} sx={{ borderRadius: 0, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                      <Box sx={{ width: '60%' }}>
                        <Skeleton variant="text" height={30} width="80%" />
                        <Skeleton variant="text" height={20} width="60%" />
                        <Skeleton variant="text" height={20} width="40%" sx={{ mt: 1 }} />
                      </Box>
                      <Skeleton variant="rectangular" width={120} height={40} />
                    </CardContent>
                  </Card>
                ))
              ) : (
                booths.map((booth, i) => (
                  <Card key={i} sx={{ borderRadius: 0, border: '1px solid', borderColor: 'divider', transition: 'all 0.2s ease', '&:hover': { borderColor: 'primary.main', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' } }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>{booth.ps_name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>{booth.ac}, {booth.district}</Typography>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, display: 'block', mt: 1 }}>BOOTH NO: {booth.ps_number}</Typography>
                      </Box>
                      <Button 
                        variant="outlined" 
                        startIcon={<OpenInNew />}
                        onClick={() => openInMaps(booth.latitude, booth.longitude)}
                        sx={{ borderRadius: 0, fontWeight: 800, textTransform: 'none' }}
                      >
                        View on Maps
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
              {booths.length === 0 && !loading && (
                <Alert severity="info" sx={{ borderRadius: 0 }}>No booths found in this specific search. Try a more specific locality name.</Alert>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MyArea;
