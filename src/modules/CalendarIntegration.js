import React, { useState } from 'react';
import { syncCalendar } from '../api';
import { Box, Typography, Paper, Button } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function CalendarIntegration() {
  const [events, setEvents] = useState([]);

  const add = async () => {
    const ev = { title: 'Desk Booking', start: new Date() };
    try {
      await syncCalendar(ev);
      setEvents([...events, ev]);
    } catch (err) {
      alert('Calendar sync failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6 }}>
      <Typography variant="h4">Calendar Integration</Typography>
      <Paper sx={{ p: 2, mt: 2, bgcolor: 'rgba(255,255,255,0.85)' }}>
        <Button variant="contained" onClick={add} sx={{ mb: 2 }}>
          Add Dummy Booking
        </Button>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </Paper>
    </Box>
  );
}

