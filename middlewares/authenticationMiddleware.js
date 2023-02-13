
function isLoggedIn(req, res, next){
	const token = req.signedCookies.token
	
    if(!token){
        throw new Error('Token absent')
        // console.log('error, token absent')
    }
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('success', 'Please login first!')
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