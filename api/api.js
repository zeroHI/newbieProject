const express = require('express');
const Pad = require('../models/Todo');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world!');
});

router.get('/pad', (req, res) => {
  Pad.find({}, (err, result) => {
    if (err) return res.status(500).end('DB error');
    return res.json(result);
  });
});

router.post('/pad', (req, res) => {
  const pad = new Pad();
  pad.tableNum = req.body.tableNum;
  pad.menu = req.body.menu;

  pad.save((err, result) => {
    if (err) return res.status(500).end('DB error');
    return res.sendStatus(200);
  });
});

module.exports = router;

