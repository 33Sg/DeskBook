// // src/modules/Login.js
// import React, { useState } from 'react';
// import {
//   Box, Button, TextField, Typography, Paper, Grid
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import bg from '../assets/bg-login.jpg'; // creative login background

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/auth/login', form);
//       localStorage.setItem('token', res.data.token);
//       navigate('/home');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <Grid container sx={{ minHeight: '100vh' }}>
//       <Grid item xs={12} md={6}
//         sx={{
//           backgroundImage: `url(${bg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       />
//       <Grid item xs={12} md={6}>
//         <Box sx={{ p: 6 }}>
//           <Paper sx={{ p: 4 }}>
//             <Typography variant="h4" gutterBottom>Login</Typography>
//             {error && <Typography color="error">{error}</Typography>}
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="Email" type="email" fullWidth required margin="normal"
//                 value={form.email}
//                 onChange={e => setForm({ ...form, email: e.target.value })}
//               />
//               <TextField
//                 label="Password" type="password" fullWidth required margin="normal"
//                 value={form.password}
//                 onChange={e => setForm({ ...form, password: e.target.value })}
//               />
//               <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//                 Login
//               </Button>
//             </form>
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               Don't have an account? <a href="/signup">Sign up</a>
//             </Typography>
//           </Paper>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }


// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Box, TextField, Button, Typography, Paper } from '@mui/material';

// export default function Login() {
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value.trim();

//     try {
//       const res = await axios.post('/auth/login', { email, password }); // ✅ FIXED: use proxy

//       if (res.status === 200) {
//         // ✅ Save login session
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('role', res.data.role);
//         localStorage.setItem('name', res.data.name);

//         navigate('/booking'); // ✅ Redirect to booking page
//       } else {
//         alert('Login failed: ' + (res.data.message || 'Unknown error'));
//       }
//     } catch (err) {
//       alert('Login failed: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         mt: 8,
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           p: 4,
//           width: 350,
//           backgroundColor: 'white',
//         }}
//       >
//         <Typography variant="h5" align="center" gutterBottom>
//           Login
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             name="email"
//             type="email"
//             label="Email"
//             fullWidth
//             required
//             margin="normal"
//           />
//           <TextField
//             name="password"
//             type="password"
//             label="Password"
//             fullWidth
//             required
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Log In
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await axios.post('/auth/login', { email, password }); // ✅ FIXED: use proxy

      if (res.status === 200) {
        // ✅ Save login session
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);

        navigate('/booking'); // ✅ Redirect to booking page
      } else {
        alert('Login failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 350,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            label="Email"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
