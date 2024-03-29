const errorHandler = (err,req,res,next) =>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    req.flash('error', "An errror occured, Please try again")

}


module.exports = errorHandler;