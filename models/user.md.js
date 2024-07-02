const mongoose = require('mongoose')
const validate = require('validator')
const roles = require('../utils/userRoles')
const userShema = mongoose.Schema({
    firstName : {
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validate.isEmail ,'test email']
    },
    password:{
        type:String,
        required:true
    },
    token: {
        type:String,

    },
    role: {
        type: String,
        enum:[roles.USER,roles.ADMIN,roles.MANAGER],
        default:roles.USER
    },
    avatar:{
        type:String,
        default:'upload/tes.jpg'
    }
});

module.exports = mongoose.model('User',userShema)