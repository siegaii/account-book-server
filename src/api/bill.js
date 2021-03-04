const express = require('express');

const { queryCollection } = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await queryCollection('bill');
    // console.log('bills: ', bills);
    res.json({ hello: 'siegaii' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
