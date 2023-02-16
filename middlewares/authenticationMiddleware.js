
function isLoggedIn(req, res, next){

	if(req.isAuthenticated()){
		return next()
	}
	req.flash('error', 'Please login first!')
	res.redirect('/login')
}

const authorization = (...roles) =>{
	return (req,res,next) => {
		if(!roles.includes(req.user.role)){
			throw new Error('You are unauthorized to access this route')
		}
		next();
	}

}


module.exports = {
	isLoggedIn, 
	authorization
};