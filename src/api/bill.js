const express = require('express');

const { queryCollection } = require('../db');

const { resObj } = require('../utils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const options = {};

    // 分类
    if (req.query.category) {
      options.find = { category: req.query.category };
    }

    // 时间
    if (req.query.time) {
      console.log('req.query.time: ', req.query.time);
    }

    // 排序
    options.sort = req.query.amountSort === '0' ? undefined : { amount: Number(req.query.amountSort) };

    const bill = await queryCollection('bill', (col) => col.find(options.find).project({ _id: 0 }).sort(options.sort).toArray());
    res.json(resObj(bill));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
