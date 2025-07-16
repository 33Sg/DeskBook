
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Box } from '@mui/material';
// import Sidebar from './Sidebar';
// import Home from './modules/Home';
// import SeatBooking from './modules/SeatBooking';
// import Availability from './modules/Availability';
// import RulesEngine from './modules/RulesEngine';
// import CalendarIntegration from './modules/CalendarIntegration';
// import AdminControls from './modules/AdminControls';
// import About from './modules/About';
// import Contact from './modules/Contact';
// import bgImage from './assets/bg.jpg';
// import { SeatProvider } from './SeatContext'; // Real-time seat context

// export default function App() {
//   return (
//     <SeatProvider>
//       <BrowserRouter>
//         <Box
//           sx={{
//             display: 'flex',
//             height: '100vh',
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center'
//           }}
//         >
//           <Sidebar />
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               p: 4,
//               backgroundColor: 'rgba(255,255,255,0.8)',
//               overflowY: 'auto'
//             }}
//           >
//             <Routes>
//               <Route path="/" element={<Navigate to="/home" replace />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/booking" element={<SeatBooking />} />
//               <Route path="/availability" element={<Availability />} />
//               <Route path="/rules" element={<RulesEngine />} />
//               <Route path="/calendar" element={<CalendarIntegration />} />
//               <Route path="/admin" element={<AdminControls />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="*" element={<Navigate to="/home" replace />} />
//             </Routes>
//           </Box>
//         </Box>
//       </BrowserRouter>
//     </SeatProvider>
//   );
// }

// src/App.js
// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Home from './modules/Home';
import SeatBooking from './modules/SeatBooking';
import Availability from './modules/Availability';
import RulesEngine from './modules/RulesEngine';
import CalendarIntegration from './modules/CalendarIntegration';
import AdminControls from './modules/AdminControls';
import About from './modules/About';
import Contact from './modules/Contact';
import bgImage from './assets/bg.jpg';
import { SeatProvider } from './SeatContext';
import Login from './modules/Login';
import Signup from './modules/Signup';

export default function App() {
  // ✅ Read token and role from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <SeatProvider>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            backgroundColor: 'rgba(255,255,255,0.8)',
            overflowY: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/rules" element={<RulesEngine />} />
            <Route path="/calendar" element={<CalendarIntegration />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ✅ Protected routes */}
            <Route path="/booking" element={token ? <SeatBooking /> : <Navigate to="/login" />} />
            <Route path="/admin" element={token && role === 'admin' ? <AdminControls /> : <Navigate to="/" />} />
            
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Box>
      </Box>
    </SeatProvider>
  );
}
