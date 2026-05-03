import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, SmartToy, Map, People, Science, FactCheck } from '@mui/icons-material';

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'AI Assistant', icon: <SmartToy />, path: '/assistant' },
  { text: 'My Area', icon: <Map />, path: '/area' },
  { text: 'Candidates', icon: <People />, path: '/candidates' },
  { text: 'Simulation Lab', icon: <Science />, path: '/simulation' },
  { text: 'Fake News Detector', icon: <FactCheck />, path: '/fakenews' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.02)'
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="span" sx={{ color: 'info.main' }}>●</Box> VoteSmart
        </Typography>
        <Typography variant="caption" color="text.secondary">India AI Assistant</Typography>
      </Box>
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
