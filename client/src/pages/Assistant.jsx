import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, TextField, IconButton, Typography, 
  Avatar, CircularProgress, Stack, useTheme,
  Card, CardContent, Button, Divider,
  Accordion, AccordionSummary, AccordionDetails,
  Chip, Tooltip, Zoom, Fade, Badge,
  useMediaQuery
} from '@mui/material';
import { 
  Send, SmartToy, Help, Person, Search, 
  Mic, ExpandMore, AutoAwesome, AccessTime, 
  InfoOutlined, CheckCircle, Description, 
  LocationOn, Rule, DateRange, Language,
  VerifiedUser, HelpCenter, ArrowForward
} from '@mui/icons-material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';

const FAQ_DATA = {
  en: [
    { id: 1, question: "Eligibility Criteria", answer: "You must be an Indian citizen, aged 18+, and a resident of your constituency.", icon: <CheckCircle sx={{ color: '#4caf50' }} /> },
    { id: 2, question: "Required Documents", answer: "Voter ID is primary, but Aadhar, PAN, or Passport are also accepted.", icon: <Description sx={{ color: '#2196f3' }} /> },
    { id: 3, question: "Voting Steps", answer: "ID Check -> Ink Marking -> EVM Vote -> VVPAT Verification.", icon: <Rule sx={{ color: '#ff9800' }} /> },
    { id: 4, question: "NOTA Explanation", answer: "None of the Above (NOTA) allows you to reject all candidates officially.", icon: <AutoAwesome sx={{ color: '#9c27b0' }} /> },
    { id: 5, question: "Election Timeline", answer: "ECI announces phases based on state and constituency. Check eci.gov.in for your dates.", icon: <DateRange sx={{ color: '#00bcd4' }} /> },
    { id: 6, question: "Polling Booth Finder", answer: "Use your EPIC number on the National Voter's Service Portal to find your booth.", icon: <LocationOn sx={{ color: '#f44336' }} /> }
  ],
  hi: [
    { id: 1, question: "पात्रता मापदंड", answer: "आपको भारतीय नागरिक होना चाहिए, उम्र 18+ होनी चाहिए और अपने निर्वाचन क्षेत्र का निवासी होना चाहिए।", icon: <CheckCircle sx={{ color: '#4caf50' }} /> },
    { id: 2, question: "आवश्यक दस्तावेज़", answer: "वोटर आईडी मुख्य है, लेकिन आधार, पैन या पासपोर्ट भी स्वीकार किए जाते हैं।", icon: <Description sx={{ color: '#2196f3' }} /> },
    { id: 3, question: "मतदान के चरण", answer: "आईडी जांच -> स्याही लगाना -> ईवीएम वोट -> वीवीपीएटी सत्यापन।", icon: <Rule sx={{ color: '#ff9800' }} /> },
    { id: 4, question: "नोटा (NOTA) क्या है?", answer: "नोटा आपको सभी उम्मीदवारों को आधिकारिक रूप से अस्वीकार करने की अनुमति देता है।", icon: <AutoAwesome sx={{ color: '#9c27b0' }} /> },
    { id: 5, question: "चुनाव समयरेखा", answer: "ECI राज्य और निर्वाचन क्षेत्र के आधार पर चरणों की घोषणा करता है। अपनी तारीखों के लिए eci.gov.in देखें।", icon: <DateRange sx={{ color: '#00bcd4' }} /> },
    { id: 6, question: "मतदान केंद्र खोजें", answer: "अपना बूथ खोजने के लिए नेशनल वोटर सर्विस पोर्टल पर अपने ईपीआईसी नंबर का उपयोग करें।", icon: <LocationOn sx={{ color: '#f44336' }} /> }
  ]
};

const SUGGESTIONS = [
  "Check my voting eligibility",
  "Find my polling booth",
  "Voting process steps",
  "Documents required"
];

const Assistant = () => {
  const theme = useTheme();
  const isDark = theme?.palette?.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [lang, setLang] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = { 
      role: 'user', 
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: textToSend,
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: lang === 'en' ? "I'm having trouble connecting to my service." : "मुझे अपनी सेवा से जुड़ने में समस्या हो रही है।",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = FAQ_DATA[lang].filter(faq => 
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <Box sx={{ 
      height: { xs: 'auto', md: 'calc(100vh - 120px)' },
      minHeight: { xs: 'calc(100vh - 100px)', md: '0' },
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1400px',
      mx: 'auto',
      px: { xs: 1, md: 3 },
      pb: 2,
      overflow: 'hidden',
      color: 'text.primary' // Global text color
    }}>
      {/* Header Panel */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: { xs: 2, md: 3 } }}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 900, 
            background: isDark 
              ? 'linear-gradient(45deg, #FF9933, #ffffff, #138808)' 
              : 'linear-gradient(45deg, #FF9933, #000080, #138808)', // Darker middle for light mode
            backgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.5rem', md: '2.125rem' }
          }}>
            Voting Assistant
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.5 }}>
            {lang === 'en' ? 'Your Smart Election Guide' : 'आपका स्मार्ट चुनाव मार्गदर्शक'} • <Chip label="AI POWERED" size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 900, bgcolor: 'primary.main', color: 'white' }} />
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" startIcon={<Language />} onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} sx={{ borderRadius: 0, fontWeight: 900, textTransform: 'none', color: 'text.primary', borderColor: 'divider' }}>
            {lang === 'en' ? 'हिंदी' : 'English'}
          </Button>
        </Stack>
      </Stack>

      {/* Main Content Split */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        gap: { xs: 2, md: 3 }, 
        overflow: 'hidden', 
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: 0
      }}>
        
        {/* Left: AI Chat Hub (70%) */}
        <Box sx={{ 
          flex: { md: '0 0 70%' }, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 0,
          background: isDark ? 'rgba(15, 20, 25, 0.4)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: isDark ? '0 30px 60px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          minHeight: { xs: '400px', md: '0' }
        }}>
          {/* Messages area */}
          <Box 
            ref={scrollRef}
            sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              p: { xs: 2, md: 4 },
              display: 'flex', 
              flexDirection: 'column',
              gap: 3,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {/* Empty State / Onboarding */}
            {messages.length === 0 && (
              <Fade in={true}>
                <Box sx={{ mt: 'auto', mb: 'auto', textAlign: 'center', p: { xs: 2, md: 4 } }}>
                  <Box sx={{ 
                    width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 }, borderRadius: '50%', 
                    bgcolor: 'primary.main', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', 
                    mx: 'auto', mb: 3,
                    boxShadow: '0 0 40px rgba(255, 153, 51, 0.3)'
                  }}>
                    <SmartToy sx={{ fontSize: { xs: 30, md: 40 }, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                    {lang === 'en' ? 'How can I help you today?' : 'मैं आपकी आज कैसे मदद कर सकता हूं?'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, maxWidth: 400, mx: 'auto' }}>
                    {lang === 'en' ? 'Ask me anything about voter registration, identification, or the voting process.' : 'मुझसे मतदाता पंजीकरण, पहचान, या मतदान प्रक्रिया के बारे में कुछ भी पूछें।'}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap sx={{ gap: 1.5 }}>
                    {SUGGESTIONS.map((s, idx) => (
                      <Chip 
                        key={idx} 
                        label={s} 
                        onClick={() => handleSend(s)}
                        sx={{ 
                          py: 2.5, px: 1, borderRadius: 0, fontWeight: 700,
                          bgcolor: isDark ? 'rgba(255,153,51,0.1)' : 'rgba(255,153,51,0.05)', 
                          color: 'primary.main',
                          border: '1px solid',
                          borderColor: 'primary.main',
                          '&:hover': { bgcolor: 'primary.main', color: 'white' }
                        }} 
                      />
                    ))}
                  </Stack>
                </Box>
              </Fade>
            )}

            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}
                >
                  <Stack direction={msg.role === 'user' ? 'row-reverse' : 'row'} spacing={2} alignItems="flex-end">
                    <Avatar sx={{ 
                      width: 36, height: 36, 
                      bgcolor: msg.role === 'user' ? 'primary.main' : (isDark ? '#4caf50' : '#2e7d32'),
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}>
                      {msg.role === 'user' ? <Person sx={{ fontSize: 20 }} /> : <SmartToy sx={{ fontSize: 20 }} />}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <Box sx={{ 
                        p: '14px 20px', 
                        borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                        bgcolor: msg.role === 'user' ? 'primary.main' : (isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6'),
                        color: msg.role === 'user' ? 'white' : 'text.primary',
                        border: '1px solid',
                        borderColor: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'divider',
                        boxShadow: msg.role === 'user' ? '0 10px 30px rgba(255, 153, 51, 0.2)' : 'none'
                      }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 500, fontSize: '0.95rem' }}>
                          {msg.text}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary', fontWeight: 700, fontSize: '0.6rem', opacity: 0.6 }}>
                        {msg.timestamp}
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: isDark ? '#4caf50' : '#2e7d32' }}><SmartToy sx={{ fontSize: 20 }} /></Avatar>
                <Box sx={{ p: '14px 20px', bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6', borderRadius: '24px 24px 24px 4px' }}>
                  <Stack direction="row" spacing={0.5}>
                    {[0, 1, 2].map(d => (
                      <Box key={d} component={motion.div} 
                        animate={{ y: [0, -6, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.15 }}
                        sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%' }} 
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box sx={{ p: { xs: 2, md: 3 }, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', gap: 1, 
              bgcolor: isDark ? '#1a2027' : '#fff', 
              borderRadius: 0, p: '6px 6px 6px 12px',
              border: '1px solid', borderColor: 'divider',
              transition: 'all 0.3s ease',
              '&:focus-within': { borderColor: 'primary.main', boxShadow: '0 0 0 4px rgba(255,153,51,0.15)' }
            }}>
              <Tooltip title={lang === 'en' ? "Speak in Hindi or English" : "हिंदी या अंग्रेजी में बोलें"}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}><Mic /></IconButton>
              </Tooltip>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                variant="standard"
                placeholder={lang === 'en' ? "Ask anything..." : "कुछ भी पूछें..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                InputProps={{ disableUnderline: true }}
                sx={{ '& .MuiInputBase-input': { fontWeight: 500, fontSize: '0.95rem', color: 'text.primary' } }}
              />
              <IconButton 
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                sx={{ 
                  bgcolor: 'primary.main', color: 'white', 
                  width: 40, height: 40, 
                  borderRadius: 0,
                  boxShadow: isDark 
                    ? '0 0 15px rgba(255, 153, 51, 0.2), 0 0 30px rgba(255, 153, 51, 0.1)'
                    : '0 4px 14px rgba(255, 153, 51, 0.4)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    bgcolor: 'primary.dark', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(255, 153, 51, 0.5), 0 0 15px rgba(255, 153, 51, 0.3)'
                  },
                  '&:active': { transform: 'scale(0.95)' },
                  '&:disabled': { bgcolor: 'action.disabledBackground', boxShadow: 'none' }
                }}
              >
                <Send fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Right: FAQ & Helper (30%) */}
        {!isMobile && (
          <Box sx={{ 
            flex: '0 0 28%', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: 0,
            background: isDark ? 'rgba(15, 20, 25, 0.4)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.primary' }}>
                <HelpCenter color="primary" /> {lang === 'en' ? 'Quick Help' : 'त्वरित सहायता'}
              </Typography>
              <TextField
                fullWidth size="small"
                placeholder={lang === 'en' ? "Search topics..." : "विषय खोजें..."}
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />,
                  sx: { borderRadius: 0, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', border: 'none', color: 'text.primary' }
                }}
              />
            </Box>

            <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 1.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
              {filteredFAQs.map((faq) => (
                <Accordion 
                  key={faq.id}
                  sx={{ 
                    bgcolor: 'transparent', boxShadow: 'none',
                    '&:before': { display: 'none' },
                    borderBottom: '1px solid', borderColor: 'divider'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore fontSize="small" />}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      {faq.icon}
                      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: 'text.primary' }}>{faq.question}</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, lineHeight: 1.6, display: 'block' }}>
                      {faq.answer}
                    </Typography>
                    <Button 
                      size="small" variant="text" endIcon={<ArrowForward sx={{ fontSize: 12 }} />}
                      onClick={() => handleSend(faq.question)}
                      sx={{ mt: 1.5, fontSize: '0.65rem', fontWeight: 900, textTransform: 'none', p: 0, color: 'primary.main' }}
                    >
                      Ask AI about this
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Trust Footer */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1, md: 2 }, fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
          <span>Helpline: 1950</span>
          <span>•</span>
          <span>Data from ECI</span>
          {!isMobile && <span>•</span>}
          {!isMobile && <span>AI may be inaccurate</span>}
        </Typography>
      </Box>
    </Box>
  );
};

export default Assistant;
