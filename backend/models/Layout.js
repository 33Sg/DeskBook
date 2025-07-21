const mongoose = require('mongoose');
const LayoutSchema = new mongoose.Schema({ data: Array });
module.exports = mongoose.model('Layout', LayoutSchema);
