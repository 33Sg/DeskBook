
// import React, { useState } from 'react';
// import SeatGrid from '../components/SeatGrid';
// import { useSeats } from '../SeatContext';
// import { Box, Typography, Paper, TextField, Button, Stack } from '@mui/material';

// const generateLayout = () => ({
//   seats: Array.from({ length: 100 }, (_, i) => ({
//     id: `${i+1}`,
//     label: `${i+1}`,
//     locked: false
//   }))
// });

// export default function SeatBooking() {
//   const [layout, setLayout] = useState(generateLayout());
//   const [input, setInput] = useState('');

//   const handleSeatClick = seat => {
//     setLayout(prev => ({
//       seats: prev.seats.map(s =>
//         s.id === seat.id ? { ...s, locked: true } : s
//       )
//     }));
//   };

//   const handleBook = () => {
//     const num = input.trim();
//     if (!/^\d+$/.test(num) || +num < 1 || +num > 100) {
//       alert('Enter a seat number between 1 and 100.');
//       return;
//     }
//     const seat = layout.seats.find(s => s.id === num);
//     if (!seat) return alert('Invalid seat.');
//     if (seat.locked) return alert('Seat already booked.');
//     handleSeatClick(seat);
//     setInput('');
//   };

//   const bookedList = layout.seats.filter(s => s.locked).map(s => s.id);

//   return (
//     <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
//       <Typography variant="h4" align="center" mb={3}>
//         Office Seat Booking System
//       </Typography>
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Stack direction="row" spacing={2} alignItems="center">
//           <Box sx={{ width: 24, height: 24, bgcolor: 'deepskyblue' }} />
//           <Typography>Available</Typography>
//           <Box sx={{ width: 24, height: 24, bgcolor: 'lightgray' }} />
//           <Typography>Booked</Typography>
//         </Stack>
//         <Typography mt={2}>
//           Booked Seats: {bookedList.join(', ') || 'None'}
//         </Typography>
//         <Stack direction="row" spacing={2} mt={2}>
//           <TextField label="Seat # (1–100)" value={input} onChange={e => setInput(e.target.value)} size="small" />
//           <Button variant="contained" onClick={handleBook}>Book Seat</Button>
//           <Button variant="outlined" color="error" onClick={() => setLayout(generateLayout())}>
//             Reset
//           </Button>
//         </Stack>
//       </Paper>
//       <Paper sx={{ p: 2 }}>
//         <SeatGrid layout={layout} onSeatClick={handleSeatClick} mode="user" />
//       </Paper>
//     </Box>
//   );
// }


// src/modules/SeatBooking.js
import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack } from '@mui/material';
import { useSeats } from '../SeatContext';
import SeatGrid from '../components/SeatGrid';

export default function SeatBooking() {
  const { layout, bookSeat } = useSeats();
  const [input, setInput] = useState('');

  const handleBook = () => {
    const num = input.trim();
    const seat = layout.seats.find(s => s.id === num);
    if (!/^\d+$/.test(num) || +num < 1 || +num > 100 || !seat || seat.locked) {
      alert('Invalid or already booked seat.');
      return;
    }
    console.log('Booking via button:', num);
    bookSeat(num);
    setInput('');
  };

  const bookedList = layout.seats.filter(s => s.locked).map(s => s.id);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" mb={3}>Office Seat Booking System</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ width: 24, height: 24, bgcolor: 'deepskyblue' }} />
          <Typography>Available</Typography>
          <Box sx={{ width: 24, height: 24, bgcolor: 'lightgray' }} />
          <Typography>Booked</Typography>
        </Stack>
        <Typography mt={2}>Booked Seats: {bookedList.join(', ') || 'None'}</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <TextField label="Seat # (1–100)" value={input} onChange={e => setInput(e.target.value)} size="small" />
          <Button variant="contained" onClick={handleBook}>Book Seat</Button>
        </Stack>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <SeatGrid layout={layout} onSeatClick={seat => {
          console.log('Booking via click:', seat.id);
          bookSeat(seat.id);
        }} mode="user" />
      </Paper>
    </Box>
  );
}
