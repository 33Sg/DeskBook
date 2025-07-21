// import axios from 'axios';
// const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export const fetchLayout = () => axios.get(`${BASE}/layout`);
// export const saveLayout = layout => axios.post(`${BASE}/layout`, layout);
// export const fetchAvailability = () => axios.get(`${BASE}/availability`);
// export const postBooking = booking => axios.post(`${BASE}/book`, booking);
// export const fetchRules = () => axios.get(`${BASE}/rules`);
// export const postRules = rules => axios.post(`${BASE}/rules`, rules);
// export const syncCalendar = booking => axios.post(`${BASE}/calendar`, booking);

import axios from 'axios';

// Set base URL via environment variable, fallback to proxy
const BASE = process.env.REACT_APP_API_URL || '';

// If you prefer using absolute paths instead of proxy, uncomment below:
// const BASE = process.env.REACT_APP_API_URL || 'http://localhost:6000';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token provided");
  }
  return { Authorization: `Bearer ${token}` };
};

// API requests
export const fetchLayout = () => axios.get(`${BASE}/layout`);
export const saveLayout = layout => axios.post(`${BASE}/layout`, { data: layout });
export const fetchAvailability = () => axios.get(`${BASE}/availability`);
export const postBooking = booking => axios.post(`${BASE}/book`, booking);
export const fetchRules = () => axios.get(`${BASE}/rules`);
export const postRules = rules => axios.post(`${BASE}/rules`, rules);

// Updated syncCalendar to include token
export const syncCalendar = booking => {
  const headers = getAuthHeaders();
  return axios.post(`${BASE}/calendar`, booking, { headers });
};


