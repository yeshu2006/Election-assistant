import React, { createContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import Header from './components/layout/Header';
import FloatingChatbot from './components/FloatingChatbot';
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import MyArea from './pages/MyArea';
import Candidates from './pages/Candidates';
import FakeNews from './pages/FakeNews';
import VotingProcess from './pages/VotingProcess';
import PartyManifestos from './pages/PartyManifestos';
import ReadinessQuiz from './pages/ReadinessQuiz';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import { getTheme } from './theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  // Persistence: Load theme from localStorage or default to 'dark'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('vote-smart-theme');
    return savedMode ? savedMode : 'dark';
  });
  
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('vote-smart-theme', newMode);
        return newMode;
      });
    },
  }), []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Box sx={{ 
            minHeight: '100vh', 
            bgcolor: 'background.default', 
            transition: 'background-color 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header mode={mode} />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <GlobalErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/assistant" element={<Assistant />} />
                  <Route path="/my-area" element={<MyArea />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/fake-news" element={<FakeNews />} />
                  <Route path="/voting-process" element={<VotingProcess />} />
                  <Route path="/party-manifestos" element={<PartyManifestos />} />
                  <Route path="/readiness-quiz" element={<ReadinessQuiz />} />
                </Routes>
              </GlobalErrorBoundary>
            </Box>
            <FloatingChatbot />
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
