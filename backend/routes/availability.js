const router = require('express').Router();
const Avail = require('../models/Availability');

router.get('/', async (req, res) => {
  const all = await Avail.find({});
  res.json(all);
});
module.exports = router;
