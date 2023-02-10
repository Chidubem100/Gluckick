
function isLoggedIn(req, res, next){
	const token = req.signedCookies.token
	
    if(!token){
        throw new Error('Token absent')
        // console.log('error, token absent')
    }
	if(req.isAuthenticated()){
		return next()
	}
	// next();
	// try {
    //     const {username,role,_id:userId} = user;
    //     req.user = {username,role,userId}
    //     console.log(req.user)

    //     // next()
    // } catch (error) {
    //     throw new Error('Unauthenticated')
    // }
}

const authorization = (...roles) =>{
	return (req,res,next) => {
		if(!roles.includes(req.user.role)){
			// res.redirect('/')
			throw new Error('You are unauthorized to access this route')
		}
		next();
	}

}


module.exports = {
	isLoggedIn, 
	authorization
};