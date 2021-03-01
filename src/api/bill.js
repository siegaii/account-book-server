const express = require('express');

const csv = require('csvtojson');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await csv().fromFile('./data/bill.csv');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
