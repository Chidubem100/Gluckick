
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
			req.flash('error', 'Unauthorized to access Route');
			// throw new Error('route is unauthorized to users');
			// req.flash('error', 'Unauthorized to access Route');
			res.redirect('/')
		}
		next();
	}

}


module.exports = {
	isLoggedIn, 
	authorization
};