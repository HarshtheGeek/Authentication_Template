const isAdminUser = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        res.status.json({
            message : "Access denied you are not the admin",
            success : false,
        })
    }
    next();
}



module.exports = isAdminUser;