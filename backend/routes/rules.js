const router = require('express').Router();
const Rule = require('../models/Rule');

router.get('/', async (req, res) => {
  const doc = await Rule.findOne({});
  res.json(doc || {});
});

router.post('/', async (req, res) => {
  const { maxPerUser, timeBlock } = req.body;
  let doc = await Rule.findOne({});
  if (!doc) doc = new Rule({ maxPerUser, timeBlock });
  else { doc.maxPerUser = maxPerUser; doc.timeBlock = timeBlock; }
  await doc.save();
  res.json({ success: true });
});

module.exports = router;
