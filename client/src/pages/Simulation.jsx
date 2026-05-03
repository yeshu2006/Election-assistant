import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Slider, Grid, Paper, Divider } from '@mui/material';
import { Science, TrendingUp, Group } from '@mui/icons-material';

const Simulation = () => {
  const [voterShift, setVoterShift] = useState(500);
  const WINNING_MARGIN = 2000;
  const TOTAL_VOTES = 50000;

  const resultFlipped = voterShift >= WINNING_MARGIN / 2; // Shift from A to B doubles the impact

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Vote Simulation Lab</Typography>
      
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Science color="primary" /> "Why Your Vote Matters" Simulator
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            In a hypothetical constituency where the winner won by <b>{WINNING_MARGIN.toLocaleString()}</b> votes, see how a small shift in voter behavior can change the outcome.
          </Typography>

          <Box sx={{ px: 4 }}>
            <Typography gutterBottom>Shift in Voter Preference (from Party A to Party B)</Typography>
            <Slider
              value={voterShift}
              min={0}
              max={5000}
              step={50}
              onChange={(e, val) => setVoterShift(val)}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0' },
                { value: 1000, label: '1k' },
                { value: 2000, label: '2k' },
                { value: 3000, label: '3k' },
                { value: 4000, label: '4k' },
                { value: 5000, label: '5k' },
              ]}
            />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, textAlign: 'center', borderTop: '5px solid', borderColor: resultFlipped ? 'error.main' : 'secondary.main' }}>
            <Typography variant="subtitle1" color="text.secondary">Current Outcome</Typography>
            <Typography variant="h3" sx={{ my: 2 }}>{resultFlipped ? 'Party B Wins!' : 'Party A Wins!'}</Typography>
            <Typography variant="body2">
              {resultFlipped 
                ? `Party B flipped the seat with a lead of ${(voterShift * 2 - WINNING_MARGIN).toLocaleString()} votes.`
                : `Party A holds the seat by ${(WINNING_MARGIN - voterShift * 2).toLocaleString()} votes.`}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TrendingUp color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">The Power of {voterShift.toLocaleString()} Votes</Typography>
                <Typography variant="body2">Every vote shifted from one candidate to another counts as <b>double</b> against the margin.</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Group color="info" fontSize="large" />
              <Box>
                <Typography variant="h6">Civic Impact</Typography>
                <Typography variant="body2">In India, many assembly seats are decided by less than 5,000 votes. Your participation is the margin of victory.</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Simulation;
