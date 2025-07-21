// import React, { useState } from 'react';
// import { syncCalendar } from '../api';
// import { Box, Typography, Paper, Button } from '@mui/material';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';


// export default function CalendarIntegration() {
//   const [events, setEvents] = useState([]);

//   const add = async () => {
//     const ev = { title: 'Desk Booking', start: new Date() };
//     try {
//       await syncCalendar(ev);
//       setEvents([...events, ev]);
//     } catch (err) {
//       alert('Calendar sync failed: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6 }}>
//       <Typography variant="h4">Calendar Integration</Typography>
//       <Paper sx={{ p: 2, mt: 2, bgcolor: 'rgba(255,255,255,0.85)' }}>
//         <Button variant="contained" onClick={add} sx={{ mb: 2 }}>
//           Add Dummy Booking
//         </Button>
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           height="auto"
//         />
//       </Paper>
//     </Box>
//   );
// }

// src/modules/CalendarIntegration.js
import React, { useState } from 'react';
import { syncCalendar } from '../api';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function CalendarIntegration() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const add = async () => {
    const event = {
      title: 'Desk Booking',
      start: selectedDate.toISOString(), // formatted for calendar
    };
    try {
      await syncCalendar(event);
      setEvents([...events, event]);
    } catch (err) {
      alert('Calendar sync failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>Calendar Integration</Typography>
      <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.9)' }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Booking Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="YYYY-MM-DD"
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={add}>
            Add Booking
          </Button>
        </Stack>

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
