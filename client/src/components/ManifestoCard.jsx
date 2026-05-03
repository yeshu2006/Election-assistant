import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Assignment, Star, LocalAtm, TrendingUp } from '@mui/icons-material';

const ManifestoCard = ({ manifesto, partyName }) => {
  if (!manifesto) return null;

  return (
    <Card sx={{ mt: 2, bgcolor: 'rgba(0,0,0,0.01)', border: '1px dashed', borderColor: 'primary.main' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assignment fontSize="small" /> {partyName} Manifesto Highlights
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1 }}>Key Themes</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {manifesto.themes?.map((theme, i) => (
                <Chip key={i} label={theme} size="small" variant="outlined" />
              ))}
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>Major Promises</Typography>
            <List size="small" sx={{ p: 0 }}>
              {manifesto.promises?.slice(0, 3).map((promise, i) => (
                <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary={`• ${promise}`} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1 }}>Target Sectors</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {manifesto.target_sectors?.map((sector, i) => (
                <Chip key={i} label={sector} size="small" color="info" variant="outlined" />
              ))}
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>Budget Focus</Typography>
            <Box sx={{ mt: 1 }}>
              {manifesto.budget_focus?.map((focus, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">{focus}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ManifestoCard;
