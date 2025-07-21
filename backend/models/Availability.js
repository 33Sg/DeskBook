const mongoose = require('mongoose');
const AvailSchema = new mongoose.Schema({
  spotId: String,
  booked: Boolean
});
module.exports = mongoose.model('Availability', AvailSchema);
