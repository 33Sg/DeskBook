const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  spotId: String,
  user: String,
  start: Date,
  end: Date
});
module.exports = mongoose.model('Booking', BookingSchema);
