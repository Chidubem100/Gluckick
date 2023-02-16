const errorHandler = (err,req,res,next) =>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    console.log(err)
    req.flash('error', "An errror occured, Please try again")
    // res.send('<h2>An Error Occured, Plese try again</h2>')

}


module.exports = errorHandler;