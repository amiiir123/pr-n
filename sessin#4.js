//##################session 4##################
/*
const http = require('node:http');
const hostname='127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
    res.statusCode = 200 ;
    res.setHeader('Content-Type','text/plain');
    res.write("Hello World");
    res.end();
});
server.listen(port ,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});*/

const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('./views')) //file css html
app.get('/',(req,res)=>{
    res.send('Hello world !')
})
app.listen(port , ()=>{
    console.log(`Example app ${port}`)
})