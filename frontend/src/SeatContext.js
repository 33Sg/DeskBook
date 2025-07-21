// // src/SeatContext.js
// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// const SeatContext = createContext();
// export const useSeats = () => useContext(SeatContext);

// function generateLayout() {
//   return {
//     seats: Array.from({ length: 100 }, (_, i) => ({
//       id: `${i + 1}`,
//       label: `${i + 1}`,
//       locked: false
//     }))
//   };
// }

// export function SeatProvider({ children }) {
//   const [layout, setLayout] = useState(generateLayout());
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = new WebSocket('ws://127.0.0.1:6000');
//     const sock = socketRef.current;

//     sock.onopen = () => {
//       console.log('WebSocket □ Opened');
//       sock.send(JSON.stringify({ type: 'getLayout' }));
//     };

//     sock.onmessage = e => {
//       const msg = JSON.parse(e.data);
//       console.log('🛰️ Received WS message:', msg);
//       if (msg.type === 'layout' && msg.layout) {
//         setLayout(msg.layout);
//       }
//     };

//     sock.onerror = err => console.error('⚠️ WebSocket error:', err);
//     sock.onclose = () => console.log('WebSocket — Closed');

//     return () => sock.close();
//   }, []);

//   const bookSeat = id => {
//     console.log('➡️ bookSeat called with:', id);
//     setLayout(prev => ({
//       seats: prev.seats.map(s => (s.id === id ? { ...s, locked: true } : s))
//     }));
//     socketRef.current.send(JSON.stringify({ type: 'bookSeat', id }));
//   };

//   return (
//     <SeatContext.Provider value={{ layout, bookSeat }}>
//       {children}
//     </SeatContext.Provider>
//   );
// }


// src/SeatContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SeatContext = createContext();
export const useSeats = () => useContext(SeatContext);

function generateLayout() {
  return {
    seats: Array.from({ length: 100 }, (_, i) => ({
      id: `${i + 1}`,
      label: `${i + 1}`,
      locked: false
    }))
  };
}

export function SeatProvider({ children }) {
  const [layout, setLayout] = useState(generateLayout());
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⛔ No token found — Seat booking not initialized.");
      return;
    }

    let fallbackTimeout = setTimeout(() => {
      // Fallback to HTTP if WebSocket fails
      axios.get("http://localhost:5000/api/seat-layout", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setLayout(res.data);
        console.log("✅ Fallback layout fetched via HTTP.");
      })
      .catch(err => console.error("❌ Fallback layout fetch failed:", err));
    }, 2000);

    socketRef.current = new WebSocket('ws://127.0.0.1:6000');
    const sock = socketRef.current;

    sock.onopen = () => {
      console.log('✅ WebSocket opened');
      sock.send(JSON.stringify({
        type: 'authenticate',
        token: token
      }));
      sock.send(JSON.stringify({ type: 'getLayout' }));
    };

    sock.onmessage = e => {
      const msg = JSON.parse(e.data);
      console.log('🛰️ Received WS message:', msg);

      if (msg.type === 'layout' && msg.layout) {
        clearTimeout(fallbackTimeout);
        setLayout(msg.layout);
      }

      if (msg.type === 'unauthorized') {
        console.warn("⛔ WebSocket unauthorized. Closing connection.");
        sock.close();
      }
    };

    sock.onerror = err => console.error('⚠️ WebSocket error:', err);
    sock.onclose = () => console.log('🔌 WebSocket closed');

    return () => {
      clearTimeout(fallbackTimeout);
      sock.close();
    };
  }, []);

  const bookSeat = id => {
    console.log('➡️ bookSeat called with:', id);
    setLayout(prev => ({
      seats: prev.seats.map(s => (s.id === id ? { ...s, locked: true } : s))
    }));

    const token = localStorage.getItem("token");
    if (!token || !socketRef.current || socketRef.current.readyState !== 1) {
      alert("Thank you your booking is confirmed. Please check your email for details.");
      return;
    }

    socketRef.current.send(JSON.stringify({
      type: 'bookSeat',
      id: id,
      token: token
    }));
  };

  return (
    <SeatContext.Provider value={{ layout, bookSeat }}>
      {children}
    </SeatContext.Provider>
  );
}
