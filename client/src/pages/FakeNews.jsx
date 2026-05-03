import { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress, Alert, LinearProgress, Container } from '@mui/material';
import FactCheck from '@mui/icons-material/FactCheck';
import Shield from '@mui/icons-material/Shield';
import Help from '@mui/icons-material/Help';
import Language from '@mui/icons-material/Language';
import { verifyClaim } from '../services/geminiClient';

const FakeNews = () => {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');

  const handleVerify = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const analysis = await verifyClaim(claim, lang);
      setResult(analysis);
    } catch (error) {
      console.error(error);
      setResult({
        likelihood: 'Needs Verification',
        confidence: 0,
        explanation: lang === 'en'
          ? `Gemini is not available: ${error.message}. Please verify this claim with official ECI or PIB Fact Check sources.`
          : `Gemini उपलब्ध नहीं है: ${error.message}. कृपया इस दावे को आधिकारिक ECI या PIB Fact Check स्रोतों से सत्यापित करें।`,
      });
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

  const getStatusLabel = (likelihood) => {
    if (lang === 'en') return likelihood;
    switch (likelihood) {
      case 'Likely True': return 'संभावित रूप से सही';
      case 'Misleading': return 'भ्रामक';
      default: return 'सत्यापन आवश्यक';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 4 }}>
        <Typography variant="h4">{lang === 'en' ? 'Fake News Detector' : 'फेक न्यूज डिटेक्टर'}</Typography>
        <Button
          variant="outlined"
          startIcon={<Language />}
          onClick={() => setLang((current) => current === 'en' ? 'hi' : 'en')}
          sx={{ borderRadius: 0, fontWeight: 800, textTransform: 'none' }}
        >
          {lang === 'en' ? 'हिंदी' : 'English'}
        </Button>
      </Box>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Shield color="primary" /> {lang === 'en' ? 'Verify Political Claims' : 'राजनीतिक दावों की जांच करें'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {lang === 'en'
              ? 'Paste a news headline, social media post, or claim here. Our AI will analyze it for factual accuracy and neutrality.'
              : 'यहां कोई न्यूज हेडलाइन, सोशल मीडिया पोस्ट, या दावा डालें। AI उसे तथ्यात्मकता और निष्पक्षता के आधार पर जांचेगा।'}
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder={lang === 'en'
              ? "e.g., 'Election Commission has cancelled voting in X district due to protests...'"
              : "जैसे: 'चुनाव आयोग ने विरोध के कारण X जिले में मतदान रद्द कर दिया है...'"} 
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
            {loading
              ? (lang === 'en' ? 'Analyzing Claim...' : 'दावे की जांच हो रही है...')
              : (lang === 'en' ? 'Check Authenticity' : 'प्रामाणिकता जांचें')}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card sx={{ borderLeft: '10px solid', borderColor: getStatusColor(result.likelihood) }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ color: getStatusColor(result.likelihood), fontWeight: 700 }}>
                {getStatusLabel(result.likelihood)}
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6">{result.confidence}%</Typography>
                <Typography variant="caption">{lang === 'en' ? 'AI Confidence' : 'AI विश्वास'}</Typography>
              </Box>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={result.confidence} 
              sx={{ mb: 3, height: 8, borderRadius: 5, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: getStatusColor(result.likelihood) } }} 
            />

            <Typography variant="body1" sx={{ mb: 2 }}>
              <b>{lang === 'en' ? 'Analysis:' : 'विश्लेषण:'}</b> {result.explanation}
            </Typography>

            <Alert severity="info" icon={<Help />}>
              <b>{lang === 'en' ? 'Disclaimer:' : 'अस्वीकरण:'}</b>{' '}
              {lang === 'en'
                ? 'This analysis is performed by AI and should be cross-verified with official ECI statements or trusted fact-checking organizations like PIB Fact Check.'
                : 'यह विश्लेषण AI द्वारा किया गया है। इसे आधिकारिक ECI बयानों या PIB Fact Check जैसे भरोसेमंद स्रोतों से जरूर सत्यापित करें।'}
            </Alert>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default FakeNews;
