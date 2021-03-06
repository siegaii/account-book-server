const { resObj, isNotEmpty, getMonthTimerange } = require('../src/utils');

test('resObj/responds with a resObj', () => {
  const res = resObj([1, 2, 3], { count: 3 });
  expect(res).toEqual({ data: [1, 2, 3], count: 3 });
});

test('isNotEmpty/responds with a true', () => {
  const err = isNotEmpty('hello');
  expect(err).toBeTruthy();
});

test('getMonthTimerange/responds with a true', () => {
  const time = getMonthTimerange(2020, 3);
  expect(time).toEqual([1582992000000, 1585670400000]);
});
