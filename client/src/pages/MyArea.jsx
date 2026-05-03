import { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Grid, 
  Card, CardContent,
  Divider, Alert, Container, Paper, Stack,
  useTheme, CircularProgress, Skeleton
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import LocationOn from '@mui/icons-material/LocationOn';
import OpenInNew from '@mui/icons-material/OpenInNew';
import HowToVote from '@mui/icons-material/HowToVote';
import { motion } from 'framer-motion';
import { searchElectionInfo } from '../data/electionData';

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
    window.setTimeout(() => {
      const matches = searchElectionInfo(address);
      const bestMatch = matches[0] || null;
      setResults(bestMatch ? {
        formatted: `${bestMatch.matchedLocation}, ${bestMatch.state}`,
        state: bestMatch.state,
        type: bestMatch.type,
        ceo: bestMatch.ceo,
        ceoWebsite: bestMatch.ceoWebsite,
        helpline: bestMatch.helpline,
      } : null);
      setBooths(bestMatch?.filteredBooths || []);
      setLoading(false);
    }, 250);
  };

  const openInMaps = (query) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
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
            Search curated Indian election area data and polling station examples.
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
                  CEO: {results.ceo} • Helpline: {results.helpline}
                </Typography>
                <Button
                  href={results.ceoWebsite}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<OpenInNew />}
                  sx={{ mt: 2, borderRadius: 0, fontWeight: 800, textTransform: 'none' }}
                >
                  Official CEO Website
                </Button>
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
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>{booth.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>{booth.address}</Typography>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, display: 'block', mt: 1 }}>BOOTH: {booth.id} • {booth.constituency}</Typography>
                      </Box>
                      <Button 
                        variant="outlined" 
                        startIcon={<OpenInNew />}
                        onClick={() => openInMaps(booth.address)}
                        sx={{ borderRadius: 0, fontWeight: 800, textTransform: 'none' }}
                      >
                        View on Maps
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
              {booths.length === 0 && !loading && (
                <Alert severity="info" sx={{ borderRadius: 0 }}>No curated booths found. Try a city, district, or state name.</Alert>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MyArea;
