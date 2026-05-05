import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, Fab, Paper, Typography, TextField, 
  IconButton, Avatar, Fade, useTheme,
  LinearProgress
} from '@mui/material';
import Chat from '@mui/icons-material/Chat';
import Close from '@mui/icons-material/Close';
import Send from '@mui/icons-material/Send';
import Help from '@mui/icons-material/Help';
import Lightbulb from '@mui/icons-material/Lightbulb';
import { getChatResponse } from '../services/geminiClient';

const FloatingChatbot = () => {
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([
    { role: 'assistant', content: 'Namaste! I am VoteSmart AI. Ask me anything about voting, elections, and your voter rights.' }
  ]);
  const [loading, setLoading] = useState(false);

  // Return null AFTER all hooks are declared to avoid React crash
  if (location.pathname === '/assistant') return null;

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = { role: 'user', content: message };
    setHistory([...history, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const response = await getChatResponse(
        message,
        history.slice(-5).map((item) => ({
          role: item.role === 'user' ? 'user' : 'model',
          text: item.content,
        })),
        'auto',
      );
      setHistory(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'assistant', content: `Gemini is not available: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 2000 }}>
      <Fade in={open}>
        <Paper elevation={3} sx={{ 
          position: 'absolute', bottom: 100, right: 0, 
          width: { xs: 360, sm: 420 }, 
          maxHeight: 600, 
          borderRadius: 0, // Rectangular theme consistency
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          bgcolor: isDark ? '#0f1419' : '#ffffff',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          boxShadow: isDark 
            ? '0 20px 60px rgba(0,0,0,0.8)' 
            : '0 20px 60px rgba(0,0,0,0.15)'
        }}>
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            background: isDark 
              ? 'linear-gradient(135deg, #1a2f4a 0%, #0f1419 100%)' 
              : 'linear-gradient(135deg, #FF9933 0%, #FFB366 100%)',
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ 
                bgcolor: isDark ? 'rgba(255,255,255,0.1)' : '#fff', 
                width: 40, height: 40,
                borderRadius: 0,
                border: '2px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
              }}>
                <Help fontSize="small" sx={{ color: isDark ? '#FF9933' : '#FF9933' }} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#fff', fontSize: '1rem' }}>
                  VoteSmart AI
                </Typography>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isDark ? '#a8e6cf' : '#d1fae5', fontWeight: 700 }}>
                  <Box sx={{ width: 6, height: 6, bgcolor: isDark ? '#a8e6cf' : '#10b981' }} /> 
                  Ready to help
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              aria-label="Close VoteSmart chat"
              sx={{ color: '#fff' }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box
            role="log"
            aria-live="polite"
            aria-label="VoteSmart chat messages"
            sx={{ 
            flexGrow: 1, 
            p: 2.5, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            backgroundColor: isDark ? 'rgba(15, 20, 25, 0.5)' : 'rgba(249, 250, 251, 1)',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '3px',
            },
          }}
          >
            {history.map((msg, i) => (
              <Box key={i} sx={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                <Box sx={{ 
                  p: '10px 16px', 
                  borderRadius: 0,
                  bgcolor: msg.role === 'user' 
                    ? 'primary.main' 
                    : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: msg.role === 'user' ? '#fff' : 'text.primary',
                  border: msg.role === 'user' ? 'none' : '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  wordBreak: 'break-word'
                }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, fontWeight: 500, fontSize: '0.9rem' }}>
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
            ))}

            {history.length <= 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1, mb: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, mb: 0.5, px: 1 }}>
                  <Lightbulb sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                  Common Questions:
                </Typography>
                {[
                  "How do I vote?",
                  "What ID do I need?",
                  "Where is my booth?",
                  "What is VVPAT?"
                ].map((q, idx) => (
                  <Box 
                    key={idx}
                    onClick={() => {
                      setMessage(q);
                      // Execute handleSend after state update
                    }}
                    sx={{ 
                      p: '10px 12px', 
                      borderRadius: 0,
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                      bgcolor: isDark ? 'rgba(255,153,51,0.05)' : 'rgba(255,153,51,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      '&:hover': { 
                        bgcolor: 'primary.main', 
                        color: '#fff',
                        borderColor: 'primary.main',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {q}
                  </Box>
                ))}
              </Box>
            )}

            {loading && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                  VoteSmart is thinking...
                </Typography>
              </Box>
            )}
          </Box>

          {loading && <LinearProgress sx={{ height: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />}

          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', bgcolor: isDark ? 'rgba(15, 20, 25, 0.5)' : '#f9fafb' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                variant="outlined"
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    fontSize: '0.9rem',
                    bgcolor: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                    '&:hover': {
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                    },
                    '&.Mui-focused': {
                      borderColor: 'primary.main',
                      boxShadow: `0 0 0 3px ${isDark ? 'rgba(255,153,51,0.1)' : 'rgba(255,153,51,0.15)'}`
                    }
                  }
                }}
              />
              <IconButton 
                onClick={handleSend}
                disabled={loading || !message.trim()}
                aria-label="Send chat message"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                  '&:hover': { bgcolor: 'primary.dark' },
                  '&:disabled': { bgcolor: 'action.disabledBackground' },
                  boxShadow: '0 4px 12px rgba(255,153,51,0.3)'
                }}
              >
                <Send sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Fade>

      <Fab 
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close VoteSmart chat' : 'Open VoteSmart chat'}
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          width: 64,
          height: 64,
          borderRadius: 0, // Rectangular theme
          boxShadow: '0 8px 24px rgba(255,153,51,0.4)',
          '&:hover': {
            bgcolor: 'primary.dark',
            boxShadow: '0 12px 32px rgba(255,153,51,0.5)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Chat sx={{ fontSize: 28 }} />
      </Fab>
    </Box>
  );
};

export default FloatingChatbot;
