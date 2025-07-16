
// import React, { useState } from 'react';
// import SeatGrid from '../components/SeatGrid';
// import { Box, Typography, Paper } from '@mui/material';

// const generateLayout = () => ({
//   seats: Array.from({ length: 100 }, (_, i) => ({
//     id: `${i+1}`,
//     label: `${i+1}`,
//     locked: i < 20
//   }))
// });

// export default function Availability() {
//   const [layout] = useState(generateLayout());
//   const bookedList = layout.seats.filter(s => s.locked).map(s => s.id);

//   return (
//     <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
//       <Typography variant="h4" align="center" mb={3}>
//         Real-Time Availability
//       </Typography>
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Typography>Gray = Booked, Blue = Available</Typography>
//         <Typography mt={1}>
//           Booked Seats: {bookedList.join(', ') || 'None'}
//         </Typography>
//       </Paper>
//       <Paper sx={{ p: 2 }}>
//         <SeatGrid layout={layout} mode="read" onSeatClick={() => {}} />
//       </Paper>
//     </Box>
//   );
// }

// src/modules/Availability.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useSeats } from '../SeatContext';
import SeatGrid from '../components/SeatGrid';

export default function Availability() {
  const { layout } = useSeats();
  const bookedList = layout.seats.filter(s => s.locked).map(s => s.id);

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', mt: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Real-Time Availability
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography>Gray = Booked, Blue = Available</Typography>
        <Typography sx={{ mt: 1 }}>
          Booked Seats: {bookedList.join(', ') || 'None'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2 }} elevation={2}>
        <SeatGrid layout={layout} mode="read" onSeatClick={() => {}} />
      </Paper>
    </Box>
  );
}
