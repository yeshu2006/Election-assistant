import React, { useContext, useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, 
  Container, IconButton, Drawer, List, 
  ListItem, ListItemButton, ListItemIcon, 
  ListItemText, useTheme, useMediaQuery,
  Divider, Stack
} from '@mui/material';
import { 
  HowToVote, DarkMode, LightMode, Bolt, 
  Menu as MenuIcon, Close, Home as HomeIcon, 
  Map, People, Science, FactCheck, VerifiedUser,
  Gavel, Assignment
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../../App';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'AI Assistant', icon: <Bolt />, path: '/assistant' },
  { text: 'My Area', icon: <Map />, path: '/my-area' },
  { text: 'Candidates', icon: <People />, path: '/candidates' },
  { text: 'Voter Rights', icon: <VerifiedUser />, path: '/voting-process' },
  { text: 'Manifestos', icon: <Assignment />, path: '/party-manifestos' },
  { text: 'Fake News Detector', icon: <FactCheck />, path: '/fake-news' },
];

const Header = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileOpen(open);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: mode === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(16px)',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          top: 0,
          zIndex: 1100
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo */}
            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Box sx={{ 
                bgcolor: 'primary.main', 
                p: 0.5, borderRadius: 1.5, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: mode === 'dark' ? '0 0 15px rgba(255, 153, 51, 0.4)' : 'none'
              }}>
                <HowToVote sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
              </Box>
              <Typography variant="h5" sx={{ 
                fontWeight: 950, 
                letterSpacing: -1.5, 
                color: mode === 'dark' ? '#fff' : '#000080', 
                fontSize: { xs: '1.2rem', md: '1.5rem' } 
              }}>
                VOTE<span style={{ color: '#FF9933' }}>SMART</span>
              </Typography>
            </Box>
            
            {/* Desktop Nav */}
            {!isMobile && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Button 
                  onClick={() => navigate('/')}
                  sx={{ 
                    fontWeight: 800, 
                    color: location.pathname === '/' ? 'primary.main' : 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Home
                </Button>
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
                  sx={{ mx: 1 }}
                >
                  {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/assistant')}
                  startIcon={<Bolt />}
                  sx={{ 
                    borderRadius: 0, 
                    fontWeight: 900,
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 3,
                    boxShadow: '0 4px 14px rgba(255, 153, 51, 0.4)',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  Civic AI
                </Button>
              </Stack>
            )}

            {/* Mobile Actions */}
            {isMobile && (
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
                <IconButton color="inherit" onClick={toggleDrawer(true)} aria-label="Open navigation menu">
                  <MenuIcon />
                </IconButton>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 320,
            bgcolor: mode === 'dark' ? '#020617' : '#fff',
            p: 2
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>Navigation</Typography>
          <IconButton onClick={toggleDrawer(false)} aria-label="Close navigation menu"><Close /></IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                selected={location.pathname === item.path}
                sx={{ 
                  borderRadius: 2,
                  '&.Mui-selected': { bgcolor: 'primary.main', color: 'white', '& .MuiListItemIcon-root': { color: 'white' } }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 800 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ p: 2 }}>
          <Button 
            fullWidth variant="contained" 
            startIcon={<Bolt />} 
            onClick={() => { navigate('/assistant'); setMobileOpen(false); }}
            sx={{ py: 1.5, fontWeight: 900, borderRadius: 0 }}
          >
            Open Civic AI
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
