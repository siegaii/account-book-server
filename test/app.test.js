const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

test('GET /api/v1/bill', async (done) => {
  const response = await request.get('/api/v1/bill');
  expect(response.status).toBe(200);
  done();
});

test('GET /api/v1/category', async (done) => {
  const response = await request.get('/api/v1/category');
  expect(response.status).toBe(200);
  done();
});

test('POST /api/v1/category', async (done) => {
  const response = await request
    .post('/api/v1/bill')
    .send({ time: 1614999341000, type: '0', category: '0fnhbcle6hg', amount: '123' });
  expect(response.status).toBe(200);
  done();
});
