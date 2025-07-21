const router = require('express').Router();
const Layout = require('../models/Layout');

router.get('/', async (req, res) => {
  const doc = await Layout.findOne({});
  res.json(doc?.data || []);
});

router.post('/', async (req, res) => {
  const { data } = req.body;
  let doc = await Layout.findOne({});
  if (!doc) doc = new Layout({ data });
  else doc.data = data;
  await doc.save();
  res.json({ success: true });
});

module.exports = router;
