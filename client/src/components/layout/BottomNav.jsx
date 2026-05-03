import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, SmartToy, Map, People, Science, FactCheck } from '@mui/icons-material';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction label="Home" value="/" icon={<Home />} />
        <BottomNavigationAction label="Chat" value="/assistant" icon={<SmartToy />} />
        <BottomNavigationAction label="Area" value="/area" icon={<Map />} />
        <BottomNavigationAction label="Neta" value="/candidates" icon={<People />} />
        <BottomNavigationAction label="More" value="/fakenews" icon={<FactCheck />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
