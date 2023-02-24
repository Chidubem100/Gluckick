const moment = require('moment');

const currentUser = (req,res,next) =>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.moment = moment;
    next();
}

module.exports = {currentUser};