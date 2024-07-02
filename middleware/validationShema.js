
const {body} = require('express-validator');

const validationShema = ()=>{
    return [
            body('title')
              .notEmpty()
              .withMessage("test require")
              .isLength({min:2})
              .withMessage("invalid ggg")
              ,
            body('price')
              .notEmpty()
              .withMessage("test require2")
              .isLength({min:2})
              .withMessage("invalid ggg2")  
    ] 
    
}
module.exports = validationShema