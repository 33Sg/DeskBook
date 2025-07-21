// const router = require('express').Router();
// // Stub route: integrate Google API here
// router.post('/', (req, res) => {
//   console.log('Calendar sync:', req.body);
//   res.json({ success: true });
// });
// module.exports = router;
const router = require('express').Router();

// Temporary calendar sync endpoint (add real integration later)
router.post('/', (req, res) => {
  console.log('Calendar sync payload:', req.body);
  // TODO: Add Google Calendar integration here
  res.json({ success: true });
});

module.exports = router;
