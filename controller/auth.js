const User = require('../models/user');
const passport = require("passport");
const asyncWrapper = require('../middlewares/asyncWrapper');

const signUp = (req,res) =>{
    res.render('signup')
};

const register = asyncWrapper(async(req,res) =>{
    const {username,email, password} = req.body;
	if(!username || !email || !password){
		return res.send('<p>Please provide the needed values</p>')
	}
	if(password.length < 6){
		throw new Error('Password should not be less than 6 characters');
	}
	console.log(req.body)
	const emailAlreadyExist = await User.findOne({email})
	if(emailAlreadyExist){
		return res.send("Email already exist, user another email")
	}

	const usernameAlreadyExist = await User.findOne({username})
	if(usernameAlreadyExist){
		return res.send("Username already exist")
	}

	const isAdmin = await User.countDocuments({}) === 0;
	const role = isAdmin ? 'admin' : 'user';	

	await User.register(new User({username,email,role}),req.body.password, (err,user) =>{
		if(err){
			console.log(err)
		}
		console.log(user)
		passport.authenticate("local")(req,res, function(){
			res.send("<h3>it worked</h3>")
			 		// res.render("new post")
		});

	});


});

// login
const loginC = (req,res) =>{
	res.render("login")
}

const login = asyncWrapper(async(req,res,next) =>{
	
	const {username,password} = req.body;

	if(!username || !password){
		throw new Error('Enter the required values') 
	}
	passport.authenticate('local', (err,user,info) =>{
		if(err){
			console.log(err)
		}
		if(!user){
			return res.redirect('/login?info=' + info)
		}
		req.login(user, function(err){
			if(err){
				console.log(err)
			}
			const currentUser = req.user.id
			console.log(currentUser)
			// return res.redirect('/blogs/new'{})
			return res.render('new', {currentUser})
		});
	})(req,res,next);	
});


// logout route
const logout = (req,res) =>{
	req.logout();
	res.redirect("/signup")
}


module.exports = {
    signUp,
    register,
	loginC,
	login,
	logout
}



// chidubemNc     chidubemN
// dubemNC@mail.com
// chidubemN      chidubemN