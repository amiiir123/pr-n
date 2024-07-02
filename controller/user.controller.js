let users = require('../models/user.md');
const {body , validationResult} = require('express-validator');
let httpStatus = require('../utils/http.StatusText')
let erroor = require('../utils/apperr')
const asyncWrapper = require('../middleware/asyncWrraper')
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken')
const GenT = require('../jwt.token')
const saltRounds = 10;



const getUsers = asyncWrapper(async (req, res) => {
    const queryy = req.query // courses?limit=2&page=2
    const limit = queryy.limit || 10;
    const page = queryy.page || 1; 
    const skip = (page - 1) * limit
    const test = await users.find({},{"__v":false,'password':false}).limit(limit).skip(skip);
    res.json({status : httpStatus.success , data : {test}});
})
const register = asyncWrapper(async (req, res,next) => {
    const {firstName ,lastName ,email ,password,role } = req.body;
    console.log(password)
    const oldUser = await users.findOne({email : email});
    console.log(oldUser)
    if(oldUser){
        const error = erroor.create('already exist',404,httpStatus.fail);
        return next(error);
}
    //password hashing
    bcript.genSalt(saltRounds, async function(err, salt) {
        console.log(salt.length)
        bcript.hash(password, salt, async (err, hash) => {
            const newUser = new users({
                firstName,
                lastName,
                email,
                password : hash,
                role,
                avatar:req.file.filename
                
            });
            //jwt
            const token = await GenT({email: newUser.email,id: newUser._id,role: newUser.role})
            
            newUser.token = token;
            await newUser.save();
            res.status(201).json(newUser);
        });
    });
    
    
    //return res.json({status : httpStatus.success ,data:{test}});


}
)
const login = asyncWrapper( async (req, res,next) => {  
    const { email, password } = req.body;
    const oldUser = await users.findOne({ email: email });

    if (oldUser) {
        bcript.compare(password, oldUser.password, async function (err, isMatch) {
            if (err) {
                return next(err);
            }
            if (isMatch) {
                const token = await GenT({email: users.email,id: users._id,role: oldUser.role})
                res.status(201).json({status:"success login",data:{token}});
            } else {
                const error1 = erroor.create('Password does not match', 400, httpStatus.fail);
                return next(error1);
            }
        });
    } else {
        const error2 = erroor.create('User not exists', 404, httpStatus.fail);
        return next(error2);
    }
})
module.exports = {
    getUsers,
    register,
    login 

}