import { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, Paper,
  TextField, MenuItem, Chip, List, ListItem, ListItemText,
  useTheme, CircularProgress, Stack
} from '@mui/material';
import Assignment from '@mui/icons-material/Assignment';
import Flag from '@mui/icons-material/Flag';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';
import manifestosData from '../data/manifestos.json';

const PartyManifestos = () => {
  const theme = useTheme();
  const isDark = theme?.palette?.mode === 'dark';

  const [manifestos] = useState(Array.isArray(manifestosData) ? manifestosData : []);
  const [selectedState, setSelectedState] = useState('');
  const loading = false;

  const allStatesSelected = selectedState === '';

  const currentStateData = selectedState
    ? manifestos.find(m => m.state === selectedState)
    : null;

  const displayedStates = allStatesSelected
    ? manifestos
    : currentStateData
      ? [currentStateData]
      : [];

  const partyColors = {
    BJP: { primary: '#FF9933', light: 'rgba(255, 153, 51, 0.1)' },
    INC: { primary: '#0066cc', light: 'rgba(0, 102, 204, 0.1)' },
    AAP: { primary: '#138808', light: 'rgba(19, 136, 8, 0.1)' },
    DMK: { primary: '#a30000', light: 'rgba(163, 0, 0, 0.1)' },
    AIADMK: { primary: '#8b4513', light: 'rgba(139, 69, 19, 0.1)' },
    TMC: { primary: '#ff1493', light: 'rgba(255, 20, 147, 0.1)' },
    BJD: { primary: '#ff8c00', light: 'rgba(255, 140, 0, 0.1)' },
    NCP: { primary: '#ffa500', light: 'rgba(255, 165, 0, 0.1)' },
    SS: { primary: '#ff6347', light: 'rgba(255, 99, 71, 0.1)' }
  };

  const getPartyColor = (party) =>
    partyColors[party] || { primary: '#6366f1', light: 'rgba(99, 102, 241, 0.1)' };

  if (loading) {
    return (
      <Container maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>

      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: -1.5 }}>
            <Assignment sx={{ mr: 1.5, verticalAlign: 'middle', color: '#FF9933' }} />
            PARTY MANIFESTOS
          </Typography>
          <Typography variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}>
            Explore detailed party manifestos and their promises across different states
          </Typography>
        </motion.div>
      </Box>

      {/* State Selector */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <TextField
          select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          sx={{
            width: { xs: '100%', sm: 400 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 700
            }
          }}
          label="Select State"
        >
          <MenuItem value="">
            <Flag sx={{ mr: 1 }} /> All States
          </MenuItem>

          {manifestos.map((state) => (
            <MenuItem key={state.state} value={state.state}>
              <Flag sx={{ mr: 1 }} /> {state.state}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Content */}
      {displayedStates.length > 0 && displayedStates.map((stateData) => (
        <motion.div
          key={stateData.state}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box sx={{ mb: 6 }}>

            {/* State Header */}
            <Paper
              sx={{
                p: 4,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))'
                  : 'linear-gradient(135deg, rgba(255, 153, 51, 0.05), rgba(255, 255, 255, 0.8))',
                borderRadius: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {stateData.state}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {stateData.parties?.length || 0} major parties
              </Typography>
            </Paper>
          </Box>

          {/* Parties */}
          <Grid container spacing={4}>
            {(stateData.parties || []).map((partyData) => {
              const colors = getPartyColor(partyData.party);

              return (
                <Grid item xs={12} md={6} lg={4} key={partyData.party}>
                  <Card
                    component={motion.div}
                    whileHover={{ y: -8 }}
                    sx={{
                      height: '100%',
                      background: colors.light,
                      border: `2px solid ${colors.primary}`,
                      borderRadius: 3
                    }}
                  >

                    {/* Header */}
                    <Box sx={{
                      p: 2.5,
                      background: colors.primary,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <EmojiEvents />
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        {partyData.party}
                      </Typography>
                    </Box>

                    <CardContent>

                      {/* Themes */}
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {(partyData.manifesto?.themes || []).map((theme) => (
                          <Chip key={theme} label={theme} />
                        ))}
                      </Stack>

                      {/* Promises */}
                      <List>
                        {(partyData.manifesto?.promises || []).slice(0, 4).map((p) => (
                          <ListItem key={p}>
                            <ListItemText primary={`✓ ${p}`} />
                          </ListItem>
                        ))}
                      </List>

                      {/* Budget */}
                      {(partyData.manifesto?.budget_focus || []).map((focus, i) => {
                        const parts = focus.split(' ');
                        return (
                          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">{parts[0]}</Typography>
                            <Typography variant="caption" sx={{ color: colors.primary }}>
                              {parts.slice(1).join(' ')}
                            </Typography>
                          </Box>
                        );
                      })}

                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      ))}

    </Container>
  );
};

export default PartyManifestos;
