const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const bodyparser=require('body-parser')
const cors=require('cors')
dotenv.config()

//database name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(cors())
app.use(bodyparser.json())
client.connect();

//get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//save a password
app.post('/', async (req, res) => {
  const password =req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.json({success:true,result:findResult})
})
//delete a password
app.delete('/', async (req, res) => {
  const password =req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.json({success:true,result:findResult})
})
app.listen(port, () => { 
  console.log(`Example app listening on port http://localhost:${port}`)
})

