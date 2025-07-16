import React, { useEffect, useState } from 'react';
import { fetchRules, postRules } from '../api';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

export default function RulesEngine() {
  const [form, setForm] = useState({ maxPerUser: 2, timeBlock: '08:00-18:00' });

  useEffect(() => {
    fetchRules().then(r => setForm(r.data));
  }, []);

  const submit = () =>
    postRules(form).then(() => alert('✅ Rules saved!'));

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Booking Rules Engine
      </Typography>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.85)' }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            type="number"
            label="Max bookings per user"
            value={form.maxPerUser}
            onChange={e => setForm({ ...form, maxPerUser: +e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Allowed time block (HH:MM-HH:MM)"
            value={form.timeBlock}
            onChange={e => setForm({ ...form, timeBlock: e.target.value })}
            margin="normal"
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={submit}>
            Save Rules
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
