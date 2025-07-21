const mongoose = require('mongoose');
const RuleSchema = new mongoose.Schema({
  maxPerUser: Number,
  timeBlock: String
});
module.exports = mongoose.model('Rule', RuleSchema);
