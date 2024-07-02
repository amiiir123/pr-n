require('dotenv').config()
const cors = require('cors')
//database connection
const mongoose = require("mongoose")
const test = require('./models/mod.course')
//const url = 'mongodb+srv://salah9azhary9:RopDJ4i5k6QfZ4pH@oklets.g0wookx.mongodb.net/test?retryWrites=true&w=majority&appName=oklets';
const url = process.env.MONGO_URL;
mongoose.connect(url).then(()=>{
    console.log('mongo-db success');
    const hi = new test({title:'okkkk',price:3})
    console.log(hi.title);
})

let httpStatus = require('./utils/http.StatusText')
const path = require('path')
const express = require('express');
const app = express();
app.use(express.json()); 
//uload
app.use('/upload',express.static(path.join(__dirname,'upload')))
app.use(cors())

const coursesRouter = require('./routes/courses.route')
const usersRouter = require('./routes/user.route')

app.use('/api/courses',coursesRouter) // localhost / => /api/courses
app.use('/api/users',usersRouter) // localhost / => /api/users

//global midddlewar for not found router

app.all('*',(req,res , next)=>{
  return res.status(404).json({status: httpStatus.error,message: "not found"})
})
//global error handler
app.use((error,req,res,next)=>{
  res.status(error.statusCode || 500).json({status:httpStatus.error,message:error.message , code: error.statusCode || 500,data:null})

})






app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on port 5000");
});
























/*
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://salah9azhary9:RopDJ4i5k6QfZ4pH@oklets.g0wookx.mongodb.net/?retryWrites=true&w=majority&appName=oklets';
const client = new MongoClient(url);

// Database Name
const dbName = 'test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('test-v1');
  await collection.insertOne ({
    title:"new1",
    price: 5000
  })
  const data = await collection.find().toArray();
  console.log("data",data);
  // the following code examples can be pasted here...

  console.log('done.') ;
}
//database connection

main();
*/




