const express = require('express')
const router = express.Router()
const controllerUser = require('../controller/user.controller')
const verifyT = require('../middleware/verify.token')
const multer = require('multer')
const diskStor = multer.diskStorage({
        destination:function (req,file,cb){
                cb(null ,'upload')

        },
        filename: function(req,file,cb){
                const ext = file.mimetype.split('/')[1]
                const filename = `user-${Date.now()}.`+ ext;
                cb(null,filename)

        }
})
const filefilter = (req,file,cb)=>{
        const imagetype = file.mimetype.split('/')[0];
        if(imagetype == 'image'){
                return cb(null,true)

        }
        return cb(null,false)

}
const upload = multer({storage: diskStor,fileFilter:filefilter})
// get all users
// register
// login
router.route('/')
        .get(verifyT,controllerUser.getUsers)
router.route('/register')
        .post(upload.single('avatar'),controllerUser.register)
router.route('/login')
        .post(controllerUser.login)

module.exports = router