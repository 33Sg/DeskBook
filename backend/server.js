
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { WebSocketServer } = require('ws');
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ---- Booking Rules Routes ----
// app.get('/rules', (req, res) => {
//   res.json({ maxBookingsPerUser: 3, windowHours: 8 });
// });

// app.post('/rules', (req, res) => {
//   console.log('📥 /rules POST', req.body);
//   // Here you could update settings in a DB
//   res.json({ success: true, rules: req.body });
// });

// // ---- Admin Controls Routes ----
// app.get('/admin', (req, res) => {
//   // Example: return current layout or config
//   res.json({ layout, message: 'Admin data placeholder' });
// });

// // ---- Calendar Integration Route ----
// app.post('/calendar', (req, res) => {
//   console.log('📥 /calendar POST', req.body);
//   // You could hook in with actual calendar API here
//   res.json({ success: true, addedToCalendar: true });
// });

// // ---- HTTP + WebSocket Setup ----
// const server = http.createServer(app);
// const wss = new WebSocketServer({ noServer: true });

// // Shared layout state
// let layout = {
//   seats: Array.from({ length: 100 }, (_, i) => ({
//     id: `${i+1}`,
//     label: `${i+1}`,
//     locked: false
//   }))
// };

// // Broadcast updated layout to all clients
// function broadcast() {
//   const msg = JSON.stringify({ type: 'layout', layout });
//   wss.clients.forEach(ws => {
//     if (ws.readyState === ws.OPEN) ws.send(msg);
//   });
// }

// // Handle WebSocket connections
// wss.on('connection', ws => {
//   ws.send(JSON.stringify({ type: 'layout', layout }));
//   ws.on('message', message => {
//     const { type, id } = JSON.parse(message);
//     if (type === 'bookSeat') {
//       layout.seats = layout.seats.map(s =>
//         s.id === id ? { ...s, locked: true } : s
//       );
//       broadcast();
//     }
//   });
// });

// // Upgrade HTTP to WebSocket
// server.on('upgrade', (req, socket, head) => {
//   wss.handleUpgrade(req, socket, head, ws => {
//     wss.emit('connection', ws, req);
//   });
// });

// // Start combined server
// server.listen(6000, () => {
//   console.log('🚀 HTTP + WebSocket server listening on port 6000');
// });

// server.js

require('dotenv').config();
const port = process.env.PORT || 6000;
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { WebSocketServer } = require('ws');

const authRoutes = require('./routes/auth');
const { authenticate, authorizeAdmin } = require('./middleware/authMiddleware');

const app = express();
app.use(cors({origin: 'http://localhost:3000',
  credentials: true}));
app.use(express.json());

// Connect MongoDB with local URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Use auth routes
app.use('/auth', authRoutes);

// Shared seat layout state
let layout = {
  seats: Array.from({ length: 100 }, (_, i) => ({
    id: `${i + 1}`,
    label: `${i + 1}`,
    locked: false,
  })),
};

// Public booking rules endpoint
app.get('/rules', (req, res) => {
  res.json({ maxBookingsPerUser: 3, windowHours: 8 });
});

// Booking rules update - protected if needed, else remove auth middleware
app.post('/rules', (req, res) => {
  console.log('📥 /rules POST', req.body);
  // Save rules to DB or memory
  res.json({ success: true, rules: req.body });
});

// Admin panel - protected route
app.get('/admin', authenticate, authorizeAdmin, (req, res) => {
  res.json({ layout, message: `Welcome Admin: ${req.user.name}` });
});

// Calendar route - protected
app.post('/calendar', authenticate, (req, res) => {
  console.log('📥 /calendar POST', req.body);
  res.json({ success: true, addedToCalendar: true });
});

// Book seat - protected route
app.post('/book-seat', authenticate, (req, res) => {
  const { id } = req.body;
  const seat = layout.seats.find((s) => s.id === id);
  if (!seat) return res.status(404).json({ message: 'Seat not found' });
  if (seat.locked) return res.status(400).json({ message: 'Seat already booked' });

  seat.locked = true;
  broadcast();
  res.json({ success: true, message: `Seat ${id} booked` });
});

// HTTP + WebSocket server setup
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

// Broadcast seat layout to all connected clients
function broadcast() {
  const msg = JSON.stringify({ type: 'layout', layout });
  wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN) ws.send(msg);
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'layout', layout }));

  ws.on('message', (message) => {
    try {
      const { type, id } = JSON.parse(message);
      if (type === 'bookSeat') {
        layout.seats = layout.seats.map((s) =>
          s.id === id ? { ...s, locked: true } : s
        );
        broadcast();
      }
    } catch (err) {
      console.error('❌ WebSocket error:', err.message);
    }
  });
});

// Upgrade HTTP to WebSocket
server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 HTTP + WebSocket server listening on port ${port}`);
});

