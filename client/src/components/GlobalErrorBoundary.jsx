import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import WarningAmber from '@mui/icons-material/WarningAmber';
import RestartAlt from '@mui/icons-material/RestartAlt';
import { motion } from 'framer-motion';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card 
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            sx={{ 
              borderRadius: 0, 
              borderTop: '4px solid', 
              borderColor: 'error.main',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              width: '100%',
              p: { xs: 2, md: 4 }
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <WarningAmber sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                System Hiccup
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500, mx: 'auto' }}>
                We encountered an unexpected error while rendering this page. Don't worry, your data is safe.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<RestartAlt />}
                onClick={() => window.location.href = '/'}
                sx={{ borderRadius: 0, fontWeight: 900, px: 6, py: 1.5 }}
              >
                Reload Application
              </Button>
            </CardContent>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
