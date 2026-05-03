import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, Grid, Accordion, 
  AccordionSummary, AccordionDetails, Tabs, Tab, 
  Button, Avatar, Chip, LinearProgress, Paper
} from '@mui/material';
import { 
  ExpandMore, Gavel, Security, Person, 
  Download, Help, Warning, CheckCircle,
  AccountBalance, FactCheck
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
  </div>
);

const VoterRights = () => {
  const [tab, setTab] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const quiz = [
    { q: "What is the minimum age to vote in India?", a: "18", options: ["18", "21", "25"] },
    { q: "Which Article of the Constitution gives you the right to vote?", a: "Article 326", options: ["Article 326", "Article 19", "Article 15"] },
    { q: "Can you get a paid holiday to vote?", a: "Yes, by Law", options: ["Yes, by Law", "Only in Govt jobs", "No"] }
  ];

  const handleQuiz = (choice) => {
    if (choice === quiz[quizStep].a) setQuizScore(quizScore + 1);
    setQuizStep(quizStep + 1);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ 
        p: { xs: 4, md: 8 }, 
        borderRadius: 8, 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)',
        color: 'white',
        mb: 6,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip label="Civic Education Portal" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', mb: 2, fontWeight: 700 }} />
          <Typography variant="h2" sx={{ fontWeight: 950, mb: 2, letterSpacing: -1 }}>Know Your Rights</Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            The Indian Constitution empowers you with specific rights and protections to ensure your voice is heard freely and fairly.
          </Typography>
        </Box>
        <AccountBalance sx={{ position: 'absolute', bottom: -20, right: -20, fontSize: 200, opacity: 0.1 }} />
      </Paper>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered variant="fullWidth">
          <Tab icon={<Gavel />} label="Constitutional Provisions" sx={{ fontWeight: 700 }} />
          <Tab icon={<Security />} label="Election Day Rights" sx={{ fontWeight: 700 }} />
          <Tab icon={<Warning />} label="Election Offenses" sx={{ fontWeight: 700 }} />
          <Tab icon={<Help />} label="Readiness Quiz" sx={{ fontWeight: 700 }} />
        </Tabs>
      </Box>

      {/* Tab 0: Constitutional Provisions */}
      <TabPanel value={tab} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Core Articles</Typography>
            {[
              { art: "Article 326", title: "Universal Adult Suffrage", desc: "Guarantees the right to vote for every citizen above 18 without discrimination based on caste, race, religion, or gender." },
              { art: "Article 324", title: "Election Commission Powers", desc: "Ensures that the ECI has the power of superintendence, direction, and control of elections to keep them free and fair." },
              { art: "Article 19", title: "Freedom of Expression", desc: "Includes the right to know your candidate and the right to express your political choice through the ballot." }
            ].map((item, i) => (
              <Box key={i} sx={{ mb: 3, p: 3, bgcolor: 'background.paper', borderRadius: 4, borderLeft: '8px solid #FF9933', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>{item.art}: {item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{item.desc}</Typography>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4, bgcolor: '#f0f2f5', borderRadius: 6, height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>The Power of NOTA</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Introduced in 2013, <b>None Of The Above (NOTA)</b> is your right to reject all candidates in your constituency while still exercising your franchise.
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 4, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Voter Privacy</Typography>
                <Typography variant="body2">Section 128 of RPA 1951 ensures the maintenance of secrecy of voting. No one can force you to reveal your vote.</Typography>
              </Box>
              <Button variant="contained" startIcon={<Download />} fullWidth sx={{ mt: 2, borderRadius: 3 }}>
                Download Voter Rights PDF
              </Button>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 1: Election Day Rights */}
      <TabPanel value={tab} index={1}>
        <Grid container spacing={3}>
          {[
            { title: "Paid Holiday", icon: CheckCircle, desc: "Mandatory holiday for employees in all sectors on the day of poll without pay cuts." },
            { title: "Priority for Elderly", icon: Person, desc: "Separate queues and priority entry for senior citizens and PwD voters." },
            { title: "Identity Freedom", icon: Security, desc: "12 alternative documents allowed if you don't have a Voter ID Card (Aadhar, PAN, etc.)" },
            { title: "Assistance", icon: FactCheck, desc: "Right to take a companion if you are visually impaired or physically unable to vote." }
          ].map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 4 }}>
                <CardContent>
                    <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 2 }}><ItemIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
            );
          })}
        </Grid>
      </TabPanel>

      {/* Tab 2: Election Offenses */}
      <TabPanel value={tab} index={2}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: 'center' }}>Know what is ILLEGAL</Typography>
          <Grid container spacing={2}>
            {[
              "Offering money or gifts for votes (Bribery)",
              "Threatening voters with consequences (Undue Influence)",
              "Hiring vehicles to transport voters to booths",
              "Spreading false information about candidate character",
              "Removing ballot papers/EVMS from polling stations"
            ].map((text, i) => (
              <Grid item xs={12} key={i}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3, border: '1px solid #ffcdd2' }}>
                  <Warning color="error" />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, p: 3, bgcolor: '#fff9c4', borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Report Violations via CVigil App</Typography>
            <Typography variant="body2">Use the ECI CVigil app to report any MCC violations with live photos/videos.</Typography>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 3: Readiness Quiz */}
      <TabPanel value={tab} index={3}>
        <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
          <Paper elevation={0} sx={{ p: 6, borderRadius: 8, border: '2px dashed #ddd' }}>
            {quizStep < quiz.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={quizStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Typography variant="overline" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    Question {quizStep + 1} of {quiz.length}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, my: 3 }}>{quiz[quizStep].q}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {quiz[quizStep].options.map((opt, i) => (
                      <Button 
                        key={i} 
                        variant="outlined" 
                        size="large" 
                        onClick={() => handleQuiz(opt)}
                        sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}
                      >
                        {opt}
                      </Button>
                    ))}
                  </Box>
                </motion.div>
              </AnimatePresence>
            ) : (
              <Box>
                <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 900 }}>Quiz Complete!</Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>Your Readiness Score: {quizScore}/{quiz.length}</Typography>
                <Button variant="contained" onClick={() => {setQuizStep(0); setQuizScore(0);}} sx={{ borderRadius: 3 }}>
                  Retake Quiz
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default VoterRights;
