const express = require('express');
const { body, validationResult } = require('express-validator');
const { queryCollection, insertDataforCollection } = require('../db');
const { resObj, isNotEmpty, getMonthTimerange } = require('../utils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const options = {
      match: {},
      sort: {}
    };

    // 分类
    if (req.query.category) {
      options.match.category = req.query.category;
    }

    // 时间
    if (req.query.month) {
      const monthTimerange = getMonthTimerange(new Date(Number(req.query.year)).getFullYear(), Number(req.query.month));
      options.match.time = { $gte: monthTimerange[0], $lt: monthTimerange[1] };
    }

    // 排序
    options.sort.amount = req.query.amountSort === '0' ? 0 : Number(req.query.amountSort);

    const aggregateArray = [
      {
        $project: { _id: 0 }
      },
      {
        $match: options.match
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: 'id',
          as: 'category'
        }
      }
    ];
    if (req.query.amountSort !== '0') {
      aggregateArray.splice(1, 0, { $sort: options.sort });
    }

    const bill = await queryCollection('bill', (col) => col.aggregate(aggregateArray).toArray());
    res.json(resObj(bill));
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  body('time').custom(isNotEmpty),
  body('type').custom(isNotEmpty),
  body('category').custom(isNotEmpty),
  body('amount').custom(isNotEmpty),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const bill = await insertDataforCollection('bill', (col) => col.insert(req.body));
      res.json(resObj(bill.ops));
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
