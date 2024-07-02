module.exports = (...roles)=>{
        return (req,res,next)=>{
            if(!roles.includes(req.currentuser.role)){
                return next("hi");
            }
            next();
        }
}
    

