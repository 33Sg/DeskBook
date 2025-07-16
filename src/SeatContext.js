// src/SeatContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

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
    socketRef.current = new WebSocket('ws://127.0.0.1:6000');
    const sock = socketRef.current;

    sock.onopen = () => {
      console.log('WebSocket □ Opened');
      sock.send(JSON.stringify({ type: 'getLayout' }));
    };

    sock.onmessage = e => {
      const msg = JSON.parse(e.data);
      console.log('🛰️ Received WS message:', msg);
      if (msg.type === 'layout' && msg.layout) {
        setLayout(msg.layout);
      }
    };

    sock.onerror = err => console.error('⚠️ WebSocket error:', err);
    sock.onclose = () => console.log('WebSocket — Closed');

    return () => sock.close();
  }, []);

  const bookSeat = id => {
    console.log('➡️ bookSeat called with:', id);
    setLayout(prev => ({
      seats: prev.seats.map(s => (s.id === id ? { ...s, locked: true } : s))
    }));
    socketRef.current.send(JSON.stringify({ type: 'bookSeat', id }));
  };

  return (
    <SeatContext.Provider value={{ layout, bookSeat }}>
      {children}
    </SeatContext.Provider>
  );
}
