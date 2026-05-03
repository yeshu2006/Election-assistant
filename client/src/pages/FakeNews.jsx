import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress, Alert, LinearProgress, Container } from '@mui/material';
import FactCheck from '@mui/icons-material/FactCheck';
import Shield from '@mui/icons-material/Shield';
import Help from '@mui/icons-material/Help';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const FakeNews = () => {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/verify`, { claim });
      setResult(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (likelihood) => {
    switch (likelihood) {
      case 'Likely True': return 'success.main';
      case 'Misleading': return 'warning.main';
      default: return 'info.main';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Fake News Detector</Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Shield color="primary" /> Verify Political Claims
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Paste a news headline, social media post, or claim here. Our AI will analyze it for factual accuracy and neutrality.
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="e.g., 'Election Commission has cancelled voting in X district due to protests...'"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            size="large" 
            fullWidth 
            onClick={handleVerify}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FactCheck />}
          >
            {loading ? 'Analyzing Claim...' : 'Check Authenticity'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card sx={{ borderLeft: '10px solid', borderColor: getStatusColor(result.likelihood) }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ color: getStatusColor(result.likelihood), fontWeight: 700 }}>
                {result.likelihood}
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6">{result.confidence}%</Typography>
                <Typography variant="caption">AI Confidence</Typography>
              </Box>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={result.confidence} 
              sx={{ mb: 3, height: 8, borderRadius: 5, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: getStatusColor(result.likelihood) } }} 
            />

            <Typography variant="body1" sx={{ mb: 2 }}>
              <b>Analysis:</b> {result.explanation}
            </Typography>

            <Alert severity="info" icon={<Help />}>
              <b>Disclaimer:</b> This analysis is performed by AI and should be cross-verified with official ECI statements or trusted fact-checking organizations like PIB Fact Check.
            </Alert>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default FakeNews;
