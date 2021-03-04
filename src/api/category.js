const express = require('express');

const { queryCollection } = require('../db');

const { resObj } = require('../utils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await queryCollection('categories');
    res.json(resObj(data));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
