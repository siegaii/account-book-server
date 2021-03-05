const resObj = (data, options) => ({ data, ...options });

const isNotEmpty = (value) => {
  if (!value) {
    throw new Error('is not empty');
  }
  return true;
};

module.exports = {
  resObj,
  isNotEmpty
};
