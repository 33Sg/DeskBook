// // src/modules/CHATGOT/Home.js
// import React from 'react';
// import { Box, Typography, Button, Stack } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Home() {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <Box sx={{ textAlign: 'center', mt: 8 }}>
//       <Typography variant="h3" gutterBottom>
//         Welcome to DeskBook
//       </Typography>

//       <Typography variant="subtitle1" sx={{ mt: 2 }}>
//         The smart solution for hybrid workspace bookings.
//       </Typography>

//       <Typography variant="subtitle2" sx={{ mt: 2 }}>
//         Our Purpose is to allow employees to book office seats in advance while helping facility teams optimize office space usage.
//       </Typography>

//       <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
//         {!token ? (
//           <>
//             <Button variant="contained" color="primary" component={Link} to="/login">
//               Login
//             </Button>
//             <Button variant="outlined" color="primary" component={Link} to="/signup">
//               Sign Up
//             </Button>
//           </>
//         ) : (
//           <>
//             {role === 'admin' ? (
//               <Button variant="contained" color="secondary" component={Link} to="/admin">
//                 Go to Admin Panel
//               </Button>
//             ) : (
//               <Button variant="contained" color="primary" component={Link} to="/book">
//                 Book a Seat
//               </Button>
//             )}
//             <Button variant="outlined" color="error" onClick={handleLogout}>
//               Logout
//             </Button>
//           </>
//         )}
//       </Stack>
//     </Box>
//   );
// }


// src/modules/CHATGOT/Home.js
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to FlexiSpot
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        The smart solution for hybrid workspace bookings.
      </Typography>

      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Our Purpose is to allow employees to book office seats in advance while helping facility teams optimize office space usage.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        {!token ? (
          <>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        ) : (
          <>
            {role === 'admin' ? (
              <Button variant="contained" color="secondary" component={Link} to="/admin">
                Go to Admin Panel
              </Button>
            ) : (
              <Button variant="contained" color="primary" component={Link} to="/book">
                Book a Seat
              </Button>
            )}
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
