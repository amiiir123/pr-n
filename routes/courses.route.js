const express = require('express')
const router = express.Router()
const controllerCourse = require('../controller/courses.controller')
const validationShema = require('../middleware/validationShema')
const verifyT = require('../middleware/verify.token')
const roles = require('../utils/userRoles')
const allowedto = require('../middleware/allowedto')
router.route('/').get(controllerCourse.getCourses).post(validationShema(),controllerCourse.sendCourse );

router.route('/:courseId')
.get(controllerCourse.getCourse )
.patch(controllerCourse.modCourse)
.delete(verifyT,allowedto(roles.ADMIN,roles.MANAGER),controllerCourse.remCourse)

module.exports = router