let courses = require('../models/mod.course');
const {body , validationResult} = require('express-validator');
let httpStatus = require('../utils/http.StatusText')
let erroor = require('../utils/apperr')
const asyncWrapper = require('../middleware/asyncWrraper')


const getCourses = asyncWrapper(async (req, res) => {
    const queryy = req.query // courses?limit=2&page=2
    const limit = queryy.limit || 10;
    const page = queryy.page || 1; 
    const skip = (page - 1) * limit
    const test = await courses.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status : httpStatus.success , data : {test}});
})
const getCourse = asyncWrapper(async (req, res,next) => {
    const test = await courses.findById(req.params.courseId)
    if(!test){
        erroor.create('not found course!',404,httpStatus.fail)
        return next(erroor);
        //return res.status(404).json({status:httpStatus.fail,data:{course:null}})
    }
    return res.json({status : httpStatus.success ,data:{test}});
}
)
const sendCourse = asyncWrapper( async (req, res,next) => {     
    // Validate request body
    console.log(req);
    const error = validationResult(req);
    if(!error.isEmpty()){
        erroor.create('empty course body!',404,httpStatus.fail);
        return next(erroor);
        //return res.status(400).json(error.array());
    }
    const newCourse = new courses(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
})
const modCourse =asyncWrapper(async (req,res)=>{
    console.log("test");
    const courseId = req.params.courseId;
    const upd = await courses.findOneAndUpdate({_id : courseId }, {$set: {...req.body}})
    res.status(200).json({status:"success",data:{upd}})
})   
const remCourse = asyncWrapper(async (req,res)=>{
    const courseId = req.params.courseId;
    await courses.findByIdAndDelete(courseId);
   // const  await courses.deleteOne({_id:courseId}); method 2
    res.status(200).json({status: "success" , data : null})

}) 
module.exports = {
    getCourses,
    getCourse,
    sendCourse ,
    modCourse ,
    remCourse
}