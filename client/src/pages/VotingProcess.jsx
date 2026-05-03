import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, Grid, 
  Stepper, Step, StepLabel, StepContent,
  Button, Avatar, Chip, Paper, Divider,
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Fingerprint from '@mui/icons-material/Fingerprint';
import HowToVote from '@mui/icons-material/HowToVote';
import Badge from '@mui/icons-material/Badge';
import ContactPage from '@mui/icons-material/ContactPage';
import DriveEta from '@mui/icons-material/DriveEta';
import FactCheck from '@mui/icons-material/FactCheck';
import CreditCard from '@mui/icons-material/CreditCard';
import Work from '@mui/icons-material/Work';
import HealthAndSafety from '@mui/icons-material/HealthAndSafety';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';

const steps = [
  {
    label: 'Identify Yourself',
    description: `Approach the first polling official who will check your name on the electoral roll and verify your ID document (Voter ID, Aadhar, etc.).`,
    icon: Badge,
  },
  {
    label: 'Marking & Sign',
    description: `The second official will mark your finger with indelible ink, give you a slip, and take your signature in the register (Form 17A).`,
    icon: Fingerprint,
  },
  {
    label: 'Casting the Vote',
    description: `Hand over the slip to the third official, show your inked finger, and then proceed to the voting compartment. Press the button on the EVM against your chosen candidate.`,
    icon: HowToVote,
  },
  {
    label: 'VVPAT Verification',
    description: `A slip will appear in the VVPAT window for 7 seconds showing the candidate you voted for. It then drops into the sealed box. Your vote is complete!`,
    icon: CheckCircle,
  },
];

const docList = [
  { name: 'EPIC (Voter ID Card)', icon: Badge },
  { name: 'Aadhaar Card', icon: ContactPage },
  { name: 'PAN Card', icon: CreditCard },
  { name: 'Driving License', icon: DriveEta },
  { name: 'Indian Passport', icon: Work },
  { name: 'MNREGA Job Card', icon: Work },
  { name: 'Health Insurance Smart Card', icon: HealthAndSafety },
  { name: 'Pension Document with Photo', icon: FactCheck },
  { name: 'Official Identity Card (MP/MLA)', icon: Badge },
  { name: 'Service Identity Card (Govt/PSU)', icon: Work }
];

const VotingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Hero Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Chip label="Election Guide" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
        <Typography variant="h2" sx={{ mb: 2, color: 'primary.main' }}>Voting Day Protocol</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Everything you need to know about the 4-step voting process and the documents you must carry to the booth.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Step-by-Step Guide */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, color: 'text.primary' }}>Inside the Polling Station</Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <Step key={step.label} active={true}>
                  <StepLabel 
                    icon={<StepIcon sx={{ color: index <= activeStep ? 'primary.main' : 'text.disabled', fontSize: 28 }} />}
                    onClick={() => setActiveStep(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep(prev => (prev + 1) % steps.length)}
                        sx={{ px: 4 }}
                      >
                        {index === steps.length - 1 ? 'Start Over' : 'Next Step'}
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
                );
              })}
            </Stepper>
          </Paper>
        </Grid>

        {/* What to Carry */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, color: 'text.primary' }}>What to Carry?</Typography>
          <Card sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'primary.main', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ fontSize: 20 }} /> Identity Proof (Any ONE)
              </Typography>
              <List sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1.5 }}>
                {docList.map((doc, i) => {
                  const DocIcon = doc.icon;
                  return (
                    <ListItem key={i} sx={{ 
                    p: 2, 
                    borderRadius: 4,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: '1px solid rgba(128,128,128,0.1)'
                  }}>
                      <ListItemIcon sx={{ minWidth: 40 }}><DocIcon color="primary" fontSize="small" /></ListItemIcon>
                    <ListItemText primary={doc.name} primaryTypographyProps={{ fontWeight: 800, variant: 'body2', color: 'text.primary' }} />
                  </ListItem>
                  );
                })}
              </List>
              <Box sx={{ 
                mt: 4, p: 3, 
                borderRadius: 5, 
                bgcolor: 'rgba(255, 153, 51, 0.1)', 
                border: '1px dashed rgba(255, 153, 51, 0.4)' 
              }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', textAlign: 'center' }}>
                  PRO TIP: Carrying your Voter Slip (from ECI) will speed up the process!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Warning Section */}
      <Box sx={{ 
        mt: 12, p: 5, 
        bgcolor: 'background.paper',
        borderRadius: 8,
        border: '1px solid rgba(239, 68, 68, 0.3)',
        boxShadow: '0 20px 40px rgba(239, 68, 68, 0.1)'
      }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: '#ef4444' }}>Strictly Prohibited</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Mobile phones, cameras, and smart devices are not allowed in the booth. 
              Violation of this rule is a punishable offense under ECI guidelines.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button variant="contained" color="error" size="large" sx={{ fontWeight: 900, px: 5 }}>
              Security Protocol
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VotingProcess;
