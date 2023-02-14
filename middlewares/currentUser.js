
const currentUser = (req,res,next) =>{
    res.locals.currentUser = req.user;
    res.locals.message = req.flash('error');
    next();
}

// const Crole = (req,res,next) =>{
//     res.locals.Crole = req.user;
//     res.local
//     // if(res.locals.Crole === 'admin') return;
//     next();
// }

module.exports = {currentUser, Crole};