const jwt = require('jsonwebtoken')
let erroor = require('../utils/apperr')
let httpStatus = require('../utils/http.StatusText')

const test =  (req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader){
        const error = erroor.create('token require',401,httpStatus.error);
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    try{
        const current = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentuser = current
        console.log(jwt.verify(token,process.env.JWT_SECRET_KEY))
        next()
    }catch(err){
        const error = erroor.create('invalid token',401,httpStatus.error);
        return next(error);
        //return res.status(401).json('invalid token')
    }
} 
module.exports = test
