const app = require('./app.js');

const port = 8888;

app.listen(port, () => {
  console.log(`请访问 http://127.0.0.1:${port}`);
});
