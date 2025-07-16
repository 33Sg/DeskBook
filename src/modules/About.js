import { Box, Typography, Paper } from '@mui/material';
export default function About() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6 }}>
      <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.85)' }}>
        <Typography variant="h4">About FlexiSpot</Typography>
        <Typography sx={{ mt: 2 }}>
          FlexiSpot allows real-time desk and meeting room booking with integrated calendar sync...
        </Typography>
      </Paper>
    </Box>
  );
}
