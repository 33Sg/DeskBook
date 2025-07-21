// // src/modules/Signup.js
// import React, { useState } from 'react';
// import {
//   Box, Button, TextField, Typography, Paper, Grid
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import bg from '../assets/bg-login.jpg'; // place a creative image in assets

// export default function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('/auth/signup', form);
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
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
//             <Typography variant="h4" gutterBottom>Sign Up</Typography>
//             {error && <Typography color="error">{error}</Typography>}
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="Name" fullWidth required margin="normal"
//                 value={form.name}
//                 onChange={e => setForm({ ...form, name: e.target.value })}
//               />
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
//                 Register
//               </Button>
//             </form>
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               Already have an account? <a href="/login">Login</a>
//             </Typography>
//           </Paper>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }


import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await axios.post('/auth/signup', { name, email, password });

      console.log('Signup response:', res);

      if (res.status >= 200 && res.status < 300) {
        alert('Signup successful! Please log in.');
        navigate('/login'); // redirect to login after signup
      } else {
        alert('Signup failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed: ' + (err.response?.data?.message || err.message));
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            required
            margin="normal"
          />
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
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
