/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const { MongoClient } = require('mongodb');
const csv = require('csvtojson');
const path = require('path');
const { DB } = require('./dbconfig.js');

// const mongoUri = `mongodb://${DA.username}:${DA.password}@${DB.ip}:${DB.port}/${DB.database}`;
const mongoUri = `mongodb://${DB.ip}:${DB.port}/${DB.database}`;

let client;

// 连接数据库
function connectDB(name) {
  client = new MongoClient(mongoUri, { useUnifiedTopology: true });
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) {
        console.log('Connection Failed!');
        reject(err);
      }
      console.log('Connection Success!');
      const db = client.db(name);
      resolve(db);
    });
  });
}

// 判断集合是否存在
function isCollectionExists(db, name) {
  return new Promise((resolve, reject) => {
    // 判断account集合是否存在
    db.listCollections({ name }).next((err, collinfo) => {
      if (err) {
        reject(err);
      }
      resolve(collinfo);
    });
  });
}

// 新建集合
function createCollection(db, name, options = {}) {
  return new Promise((resolve, reject) => {
    db.createCollection(name, options, (err, collection) => {
      if (err) {
        console.log('create collection failed');
        reject(err);
      } else {
        console.log('create collection success!');
        resolve(collection);
      }
    });
  });
}

// 初始化集合
async function initCollection(db, name) {
  const filePath = `${path.resolve(__dirname, './data')}/${name}.csv`;
  // 1.获取数据
  const data = await csv().fromFile(filePath);
  data.map((item) => (item.time = Number(item.time)));
  // 2.创建集合
  const collection = await createCollection(db, name);
  // 3. 将数据批量导入
  await collection.insertMany(data);
}

// 关闭DB
function closeDB() {
  client.close(true, (err) => {
    if (!err) {
      console.log('Close DB Success!');
    } else {
      console.log(`Close DB Failed! Msg:${err}`);
    }
  });
}

// 查集合
async function queryCollection(name, fun) {
  const db = await connectDB(DB.database);
  const col = await db.collection(name);
  const data = await fun(col);
  closeDB();
  return data;
}

// 插入数据
async function insertDataforCollection(name, fun) {
  const db = await connectDB(DB.database);
  const col = await db.collection(name);
  const data = await fun(col);
  closeDB();
  return data;
}

// 数据库初始化
async function initDB() {
  try {
    const db = await connectDB(DB.database);
    const billCollection = await isCollectionExists(db, 'bill');
    if (!billCollection) {
      console.log('Collection not exists');
      await Promise.all([initCollection(db, 'bill'), initCollection(db, 'categories')]);
    }
  } catch (err) {
    console.log('err: ', err);
  } finally {
    closeDB();
  }
}

module.exports = {
  client,
  initDB,
  closeDB,
  connectDB,
  queryCollection,
  insertDataforCollection
};
