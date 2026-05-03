import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Card, CardContent, 
  Stack, Container, LinearProgress, Fade, 
  Avatar, Divider, useTheme
} from '@mui/material';
import { 
  Help, CheckCircle, Cancel, RestartAlt, 
  ArrowForward, EmojiEvents, FactCheck
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ALL_QUESTIONS = [
  {
    q: "What is the minimum age required to vote in India?",
    options: ["18 years", "21 years", "25 years", "16 years"],
    correct: 0,
    fact: "The voting age was lowered from 21 to 18 by the 61st Amendment Act in 1988."
  },
  {
    q: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voter Verifiable Paper Account Track",
      "Voter Verified Paper Audit Track",
      "Voter Verifiable Paper Audit Trail"
    ],
    correct: 3,
    fact: "VVPAT allows voters to verify that their vote was cast as intended."
  },
  {
    q: "Which constitutional body conducts elections in India?",
    options: [
      "Supreme Court",
      "Parliament of India",
      "Election Commission of India",
      "Ministry of Home Affairs"
    ],
    correct: 2,
    fact: "The ECI is an autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    q: "What is the purpose of the 'NOTA' option on an EVM?",
    options: [
      "To cancel the election",
      "To register a secret vote",
      "To officially reject all candidates",
      "To vote for a local leader"
    ],
    correct: 2,
    fact: "NOTA (None Of The Above) was introduced in India in 2013 following a Supreme Court directive."
  },
  {
    q: "Can an Indian citizen vote without a Voter ID (EPIC) card?",
    options: [
      "No, never",
      "Yes, if their name is in the electoral roll",
      "Only if they have a passport",
      "Only in local elections"
    ],
    correct: 1,
    fact: "You can vote using any of the 12 prescribed photo IDs (like Aadhaar, PAN) if your name is in the official electoral roll."
  },
  {
    q: "What is the maximum number of candidates an EVM can support (with 4 balloting units)?",
    options: ["16", "32", "64", "128"],
    correct: 2,
    fact: "A single balloting unit supports 16 candidates; 4 units can support 64."
  },
  {
    q: "How many Lok Sabha constituencies are there in India?",
    options: ["543", "545", "250", "552"],
    correct: 0,
    fact: "There are 543 elected constituencies. The 2 nominated Anglo-Indian seats were abolished in 2020."
  },
  {
    q: "Which ink is used to mark a voter's finger?",
    options: [
      "Permanent Marker",
      "Indelible Ink (Silver Nitrate)",
      "Organic Dye",
      "Laser Marking"
    ],
    correct: 1,
    fact: "Indelible ink contains silver nitrate, which reacts with skin to leave a semi-permanent mark."
  },
  {
    q: "What is 'Form 6' used for in the election process?",
    options: [
      "Changing your address",
      "Deleting a name from the roll",
      "New Voter Registration",
      "Applying for a duplicate ID"
    ],
    correct: 2,
    fact: "Form 6 is specifically for the inclusion of names in the electoral roll for the first time."
  },
  {
    q: "What is the term of the Lok Sabha in India?",
    options: ["4 years", "5 years", "6 years", "Permanent"],
    correct: 1,
    fact: "The Lok Sabha has a normal term of 5 years from its first meeting, unless dissolved earlier."
  }
];

const ReadinessQuiz = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Shuffle and pick 5
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  }, []);

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography variant="overline" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 3 }}>
                QUESTION {currentIndex + 1} OF 5
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={((currentIndex + 1) / 5) * 100} 
                sx={{ height: 8, borderRadius: 0, mt: 2, bgcolor: 'divider' }}
              />
            </Box>

            <Card sx={{ borderRadius: 0, border: '1px solid', borderColor: 'divider', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#fff' }}>
              <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 6, lineHeight: 1.3 }}>
                  {currentQ.q}
                </Typography>

                <Stack spacing={2}>
                  {currentQ.options.map((option, idx) => {
                    const isCorrect = idx === currentQ.correct;
                    const isSelected = idx === selectedOption;
                    let borderCol = 'divider';
                    let bgCol = 'transparent';
                    
                    if (isAnswered) {
                      if (isCorrect) borderCol = '#10b981', bgCol = 'rgba(16, 185, 129, 0.05)';
                      else if (isSelected) borderCol = '#ef4444', bgCol = 'rgba(239, 68, 68, 0.05)';
                    } else if (isSelected) {
                      borderCol = 'primary.main';
                    }

                    return (
                      <Button
                        key={idx}
                        fullWidth
                        onClick={() => handleOptionClick(idx)}
                        sx={{
                          justifyContent: 'flex-start',
                          p: 3,
                          borderRadius: 0,
                          border: '1px solid',
                          borderColor: borderCol,
                          bgcolor: bgCol,
                          color: 'text.primary',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: isAnswered ? borderCol : 'primary.main',
                            bgcolor: isAnswered ? bgCol : 'rgba(255,153,51,0.02)'
                          }
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {String.fromCharCode(65 + idx)}. {option}
                        </Typography>
                      </Button>
                    );
                  })}
                </Stack>

                {isAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(255,153,51,0.05)', borderLeft: '4px solid', borderColor: 'primary.main' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FactCheck fontSize="small" /> QUICK FACT
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {currentQ.fact}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleNext}
                      endIcon={<ArrowForward />}
                      sx={{ mt: 4, py: 2, fontWeight: 900, borderRadius: 0 }}
                    >
                      {currentIndex === 4 ? 'See Results' : 'Next Question'}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', mx: 'auto', mb: 4 }}>
              <EmojiEvents sx={{ fontSize: 60, color: 'white' }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontWeight: 950, mb: 2 }}>
              Ready to Vote?
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', mb: 6, fontWeight: 700 }}>
              Your Score: <span style={{ color: '#FF9933' }}>{score}/5</span>
            </Typography>

            <Card sx={{ mb: 6, borderRadius: 0, border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  {score >= 4 ? "Excellent! You're a pro voter." : "Good effort! Keep learning to be an informed voter."}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Being an informed voter is the first step towards a stronger democracy.
                  Check out our Voting Guide for more details.
                </Typography>
              </CardContent>
            </Card>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                size="large" 
                onClick={resetQuiz} 
                startIcon={<RestartAlt />}
                sx={{ px: 6, fontWeight: 900, borderRadius: 0 }}
              >
                Retake Quiz
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                onClick={() => navigate('/')} 
                sx={{ px: 6, fontWeight: 900, borderRadius: 0 }}
              >
                Back to Home
              </Button>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ReadinessQuiz;
