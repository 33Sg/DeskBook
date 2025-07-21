// src/components/SeatGrid.js
import React from 'react';
import { Box } from '@mui/material';

export default function SeatGrid({ layout, onSeatClick, mode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '8px',
        justifyItems: 'center',
        alignItems: 'center'
      }}
    >
      {layout.seats.map(seat => (
        <Box
          key={seat.id}
          sx={{
            width: 40, height: 40,
            bgcolor: seat.locked ? 'lightgray' : 'deepskyblue',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: mode === 'user' && !seat.locked ? 'pointer' : 'default',
            borderRadius: '4px'
          }}
          onClick={() => {
            console.log('Seat clicked:', seat.id);
            if (mode === 'user' && !seat.locked) {
              onSeatClick(seat);
            }
          }}
        >
          {seat.label}
        </Box>
      ))}
    </Box>
  );
}
