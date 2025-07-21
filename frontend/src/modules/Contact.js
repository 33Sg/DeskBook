import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

export default function Contact() {
  const [msg, setMsg] = useState('');

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6 }}>
      <Typography variant="h4">Contact Us</Typography>
      <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.85)' }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Message"
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => alert('Message sent!')}>
          Send
        </Button>
      </Paper>
    </Box>
  );
}
