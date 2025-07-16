import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';

const menu = [
  { to: '/home', label: 'Home' },
  { to: '/booking', label: 'Seat Booking' },
  { to: '/availability', label: 'Real-Time Availability' },
  { to: '/rules', label: 'Booking Rules' },
  { to: '/calendar', label: 'Calendar Integration' },
  { to: '/admin', label: 'Admin Controls' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
        }
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">FlexiSpot</Typography>
      </Toolbar>
      <List>
        {menu.map(item => (
          <ListItem
            button
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              '&.active': { backgroundColor: '#e0e0e0' }
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
