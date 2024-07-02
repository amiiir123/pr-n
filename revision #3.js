const http = require("node:http");
const server=http.createServer((req,res)=>{
    console.log(req.url); 
    if (req.url == '/' ){
        res.end("home!");
    }

})
server.listen(3001,()=>{
    console.log("test 301");
})
