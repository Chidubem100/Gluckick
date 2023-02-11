
const currentUser = (req,res,next) =>{
    res.locals.currentUser = req.user;
    next();
}


module.exports = currentUser;