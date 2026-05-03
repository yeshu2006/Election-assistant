import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Button, 
  Avatar, Paper, Container, Stack, useTheme, Collapse,
  Chip, useMediaQuery
} from '@mui/material';
import {
  PersonSearch, HowToVote, FactCheck, Map, 
  Verified, Event, Bolt, Help, Assignment,
  ExpandMore, ExpandLess, ArrowForward, LocationOn
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BentoCard = ({ icon: Icon, title, subtitle, color, onClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card 
        component={motion.div}
        whileHover={{ 
          y: -10, 
          boxShadow: isDark ? `0 20px 40px ${color}20` : `0 20px 40px rgba(0,0,0,0.05)`,
          borderColor: color 
        }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        sx={{ 
          cursor: 'pointer', 
          width: '100%',
          maxWidth: 300,
          height: { xs: 200, md: 260 }, 
          textAlign: 'center',
          background: isDark ? 'rgba(15, 23, 42, 0.4)' : '#fff',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
          borderRadius: 0,
          position: 'relative',
          overflow: 'visible',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -1, left: -1, width: 40, height: 40,
            borderTop: `3px solid ${color}`,
            borderLeft: `3px solid ${color}`,
            transition: 'all 0.3s ease'
          },
          '&:hover::before': {
            width: '100%',
            height: '100%'
          }
        }}
      >
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Avatar sx={{ 
            bgcolor: `${color}15`, 
            width: { xs: 50, md: 70 }, 
            height: { xs: 50, md: 70 }, 
            mb: 2,
            border: `1px solid ${color}30`
          }}>
            <Icon sx={{ color: color, fontSize: { xs: 26, md: 36 } }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 950, mb: 1, letterSpacing: -0.5 }}>{title}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', px: 1, fontSize: '0.85rem', lineHeight: 1.5 }}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const TimelineNode = ({ date, event, status }) => {
  const theme = useTheme();
  const color = status === 'done' ? '#FF9933' : status === 'active' ? '#10b981' : '#64748b';
  return (
    <Box 
      component={motion.div}
      whileHover={{ y: -5 }}
      sx={{ flex: 1, minWidth: { xs: 150, md: 200 }, position: 'relative', textAlign: 'center', px: 2, zIndex: 1, cursor: 'pointer' }}
    >
      <Box sx={{ 
        width: { xs: 44, md: 60 }, height: { xs: 44, md: 60 }, borderRadius: 0, 
        bgcolor: status === 'done' ? 'primary.main' : status === 'active' ? 'secondary.main' : 'background.paper',
        border: '2px solid',
        borderColor: status === 'active' ? 'secondary.main' : 'divider',
        display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2,
        boxShadow: status === 'active' ? '0 0 30px rgba(16, 185, 129, 0.3)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {status === 'done' ? <Verified sx={{ color: 'white' }} /> : <Event />}
      </Box>
      <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: 2 }}>{date.toUpperCase()}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 950, mt: 0.5 }}>{event}</Typography>
    </Box>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme?.palette?.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const QUICK_QUESTIONS = [
    { question: "How do I vote?", answer: "Register online, find your booth, and carry a valid ID to the polling station on election day." },
    { question: "What ID is valid?", answer: "Voter ID, Aadhaar, PAN, Passport, or any government-issued photo identification." },
    { question: "Polling Hours?", answer: "Typically 7:00 AM to 6:00 PM. Check local announcements for exact timings." },
    { question: "What is VVPAT?", answer: "A system that provides a physical paper receipt of your vote for verification." }
  ];
  
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 10 }, pb: 10 }}>
        
        {/* Centered Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 18 } }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3.5rem', sm: '5rem', md: '8rem' },
                fontWeight: 950,
                color: 'text.primary',
                lineHeight: 0.9,
                letterSpacing: -4,
                mb: 3
              }}
            >
              EMPOWERING<br/>
              <span style={{ color: '#FF9933' }}>DEMOCRACY</span>
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 8, maxWidth: 700, mx: 'auto', fontWeight: 600, px: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              The definitive hub for the Indian voter. 
              Verify, learn, and test your election readiness with AI.
            </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" alignItems="center" sx={{ width: '100%', maxWidth: 600 }}>
              <Button 
                variant="contained" size="large" 
                onClick={() => navigate('/readiness-quiz')}
                startIcon={<HowToVote />}
                sx={{ px: 6, py: 2, fontSize: '1.1rem', fontWeight: 900, borderRadius: 0, minWidth: 240, height: 64 }}
              >
                Check Readiness
              </Button>
              <Button 
                variant="outlined" size="large" 
                onClick={() => navigate('/my-area')}
                startIcon={<LocationOn />}
                sx={{ px: 6, py: 2, fontSize: '1.1rem', fontWeight: 900, borderRadius: 0, borderWidth: 2, minWidth: 240, height: 64 }}
              >
                Find Polling Booth
              </Button>
            </Stack>
          </Box>
          </motion.div>
        </Box>

        {/* Centric Dashboard Grid */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 15, md: 20 } }}>
          <Grid container spacing={4} sx={{ maxWidth: 1300 }} justifyContent="center">
            {[
              { icon: PersonSearch, title: "Candidates", sub: "MP & MLA Profiles", color: "#2196f3", path: "/candidates" },
              { icon: FactCheck, title: "News Check", sub: "AI Fact Verification", color: "#ef4444", path: "/fake-news" },
              { icon: Assignment, title: "Manifestos", sub: "Party Promises", color: "#8b5cf6", path: "/party-manifestos" },
              { icon: Verified, title: "Readiness", sub: "Interactive Quiz", color: "#10b981", path: "/readiness-quiz" }
            ].map((item, i) => (
              <BentoCard key={i} {...item} subtitle={item.sub} onClick={() => navigate(item.path)} />
            ))}
          </Grid>
        </Box>

        {/* Roadmap Section */}
        <Box sx={{ mb: { xs: 15, md: 20 } }}>
          <Typography variant="h4" sx={{ fontWeight: 950, mb: 8, textAlign: 'center' }}>ELECTION LIFECYCLE</Typography>
          <Paper sx={{ 
            p: { xs: 4, md: 10 },
            borderRadius: 0,
            background: isDark ? 'rgba(15, 23, 42, 0.4)' : '#fff',
            border: '1px solid',
            borderColor: 'divider',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            <Stack direction="row" spacing={0} sx={{ minWidth: 900, position: 'relative', justifyContent: 'center' }}>
               <Box sx={{ position: 'absolute', top: { xs: 21, md: 29 }, left: 50, right: 50, height: 2, bgcolor: 'divider', zIndex: 0 }} />
               <TimelineNode date="Stage 1" event="Schedule" status="done" />
               <TimelineNode date="Stage 2" event="Nomination" status="done" />
               <TimelineNode date="Stage 3" event="Polling" status="active" />
               <TimelineNode date="Stage 4" event="Counting" status="pending" />
               <TimelineNode date="Stage 5" event="Result" status="pending" />
            </Stack>
          </Paper>
        </Box>

        {/* Centered Stats Section - Circle Style */}
        <Box sx={{ width: '100%', mb: 15, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={6} justifyContent="center" sx={{ maxWidth: 1200 }}>
            {[
              { label: 'Lok Sabha Seats', value: '543', color: '#FF9933' },
              { label: 'Polling Booths', value: '1.05M+', color: '#2196f3' },
              { label: 'Total Voters', value: '968M', color: '#138808' }
            ].map((stat, i) => (
              <Grid item xs={12} sm={4} key={i} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box 
                  component={motion.div}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${stat.color}30` }}
                  sx={{ 
                    width: { xs: 220, md: 260 },
                    height: { xs: 220, md: 260 },
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: stat.color,
                    bgcolor: 'transparent',
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05))'
                      : 'linear-gradient(135deg, rgba(0,0,0,0.01), rgba(0,0,0,0.03))',
                    position: 'relative',
                    textAlign: 'center',
                    p: 2,
                    boxShadow: isDark ? 'inset 0 0 20px rgba(255,255,255,0.02)' : 'inset 0 0 20px rgba(0,0,0,0.01)',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 950, color: stat.color, mb: 1, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>{stat.value}</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.secondary', maxWidth: 140, lineHeight: 1.2 }}>{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Minimal FAQ */}
        <Box sx={{ maxWidth: 900, mx: 'auto', mb: 15 }}>
          <Typography variant="h4" sx={{ fontWeight: 950, mb: 6, textAlign: 'center' }}>Quick Support</Typography>
          <Grid container spacing={2}>
            {QUICK_QUESTIONS.map((item, i) => (
              <Grid item xs={12} key={i}>
                <Card 
                  onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                  sx={{ cursor: 'pointer', borderRadius: 0, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent' }}
                >
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 800 }}>{item.question}</Typography>
                    {expandedQuestion === i ? <ExpandLess /> : <ExpandMore />}
                  </CardContent>
                  <Collapse in={expandedQuestion === i}>
                    <Box sx={{ p: 3, pt: 0, color: 'text.secondary', lineHeight: 1.8 }}>{item.answer}</Box>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Centered Footer */}
        <Box component="footer" sx={{ 
          py: 10, 
          borderTop: '1px solid', 
          borderColor: 'divider', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 950, mb: 4, letterSpacing: -2 }}>
            VOTE<span style={{ color: '#FF9933' }}>SMART</span>
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, sm: 6 }} 
            justifyContent="center" 
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Button onClick={() => navigate('/')} sx={{ fontWeight: 800, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>HOME</Button>
            <Button onClick={() => navigate('/assistant')} sx={{ fontWeight: 800, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>AI ASSISTANT</Button>
            <Button onClick={() => window.open('https://eci.gov.in')} sx={{ fontWeight: 800, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>OFFICIAL ECI</Button>
            <Button onClick={() => navigate('/voting-process')} sx={{ fontWeight: 800, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>VOTER GUIDE</Button>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6, display: 'block', mt: 6 }}>
            © 2026 VoteSmart India. Secure. Unbiased. Empowered.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
