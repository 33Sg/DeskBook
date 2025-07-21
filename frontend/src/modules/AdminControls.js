// import React, { useEffect } from 'react';
// import SeatToolkit from '@mezh-hq/react-seat-toolkit';
// import { fetchLayout, saveLayout } from '../api';

// export default function AdminControls() {
//   const [data, setData] = React.useState([]);

//   useEffect(() => {
//     fetchLayout().then(r => setData(r.data));
//   }, []);

//   return (
//     <div>
//       <h2>Admin Controls – Layout Editor</h2>
//       <SeatToolkit mode="designer" data={data}
//         events={{ onExport: layout => saveLayout(layout).then(()=>alert('Saved'))}}/>
//     </div>
//   );
// }

// src/modules/AdminControls.js


// src/modules/AdminControls.js
import React, { useEffect, useState } from 'react';
import "@mezh-hq/react-seat-toolkit/styles";
import SeatToolkit from "@mezh-hq/react-seat-toolkit";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Divider,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import { fetchLayout, saveLayout, fetchRules, postRules } from '../api';

export default function AdminControls() {
  const [layout, setLayout] = useState(null);
  const [rules, setRules] = useState({ maxBookingsPerUser: 3, windowHours: 8 });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    console.log("🔧 AdminControls mounted");

    fetchLayout()
      .then(res => {
        console.log("✅ Layout fetched:", res.data);
        setLayout(res.data);
      })
      .catch(err => {
        console.error("❌ Error fetching layout:", err);
        setLayout({ seats: [] }); // fallback empty layout
      });

    fetchRules()
      .then(res => {
        console.log("✅ Rules fetched:", res.data);
        setRules(res.data);
      })
      .catch(err => {
        console.error("❌ Error fetching rules:", err);
      });
  }, []);

  const handleLayoutExport = newLayout => {
    saveLayout(newLayout)
      .then(() => setMsg({ type: 'success', text: 'Layout saved!' }))
      .catch(() => setMsg({ type: 'error', text: 'Failed saving layout.' }));
  };

  const handleRulesSave = () => {
    postRules(rules)
      .then(() => setMsg({ type: 'success', text: 'Rules updated!' }))
      .catch(() => setMsg({ type: 'error', text: 'Failed updating rules.' }));
  };

  if (!layout) return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6">⏳ Loading Admin Controls...</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        🛠 Admin Controls Panel
      </Typography>

      <Paper elevation={3} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
        <Typography variant="h6">Desk Layout Designer</Typography>
        <Typography variant="body2" mb={1}>
          Drag, place, and design seat layout. Export to save changes.
        </Typography>
        <Box sx={{ border: '1px solid #ccc', height: 400, overflow: 'auto' }}>
          <SeatToolkit
            mode="designer"
            data={layout}
            events={{ onExport: handleLayoutExport }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => handleLayoutExport(layout)}
        >
          💾 Save Layout
        </Button>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Paper elevation={3} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
        <Typography variant="h6">Booking Rules</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Max bookings per user"
            type="number"
            value={rules.maxBookingsPerUser}
            onChange={e => setRules(r => ({ ...r, maxBookingsPerUser: +e.target.value }))}
          />
          <TextField
            label="Booking window (hours)"
            type="number"
            value={rules.windowHours}
            onChange={e => setRules(r => ({ ...r, windowHours: +e.target.value }))}
          />
          <Button variant="contained" onClick={handleRulesSave}>
            💾 Save Rules
          </Button>
        </Stack>
      </Paper>

      {msg && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={() => setMsg(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setMsg(null)} severity={msg.type}>
            {msg.text}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
