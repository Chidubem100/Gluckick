
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/login")
}

const authorization = (...roles) =>{
	return (req,res,next) => {
		if(!roles.includes(req.user.role)){
			res.redirect('/')
			// throw new Error('You are unauthorized to access this route')
		}
		next();
	}

}


module.exports = {isLoggedIn, authorization};