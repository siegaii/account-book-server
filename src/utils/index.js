const resObj = (data, options) => ({ data, ...options });

const getMonthTimerange = (year, month) => [
  new Date(`${year}-${month}`).getTime(),
  month === 12 ? new Date(`${year + 1}-1`).getTime() : new Date(`${year}-${month + 1}`).getTime()
];

const isNotEmpty = (value) => {
  if (!value) throw new Error('is not empty');
  return true;
};

module.exports = {
  resObj,
  isNotEmpty,
  getMonthTimerange
};
