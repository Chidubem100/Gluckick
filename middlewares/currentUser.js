
const currentUser = (req,res,next) =>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
}

const Crole = (req,res,next) =>{
    res.locals.Crole = req.user.role;
    if(res.locals.Crole === 'admin') return;
    next();
}

module.exports = {currentUser, Crole};