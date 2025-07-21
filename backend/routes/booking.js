const router = require('express').Router();
const Booking = require('../models/Booking');
const Avail = require('../models/Availability');

router.post('/', async (req, res) => {
  const { spotId, user } = req.body;
  const now = new Date();
  const booking = new Booking({ spotId, user, start: now, end: now });
  await booking.save();
  await Avail.updateOne({ spotId }, { spotId, booked: true }, { upsert: true });
  res.json({ success: true });
});
module.exports = router;
