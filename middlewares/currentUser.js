
const currentUser = (req,res,next) =>{
    res.locals.currentUser = req.user;
    next();
}

const Crole = (req,res,next) =>{
    res.locals.Crole = req.user;
    // if(res.locals.Crole === 'admin') return;
    next();
}

module.exports = {currentUser, Crole};