const User = require('../models/user');
const passport = require("passport");
const asyncWrapper = require('../middlewares/asyncWrapper');

const signUp = (req,res) =>{
    res.render('signup')
};

const register = asyncWrapper(async(req,res) =>{
    const {username,email, password} = req.body;
	if(!username || !email || !password){
		req.flash('error', 'Please provide the needed credentials');
		res.redirect('/signup');
	}
	if(password.length < 6){
		req.flash('error', 'Password must be more than 6 characters');
		res.redirect('/signup');
	}
	const emailAlreadyExist = await User.findOne({email})
	if(emailAlreadyExist){
		req.flash('error', 'Email already linked to an existing account');
		res.redirect('/signup');
	}

	const usernameAlreadyExist = await User.findOne({username})
	if(usernameAlreadyExist){
		req.flash('error', 'Username already taken, Please pick another username');
		res.redirect('/signup')
	}

	const isAdmin = await User.countDocuments({}) === 0;
	const role = isAdmin ? 'admin' : 'user';	

	await User.register(new User({username,email,role}),req.body.password, (err,user) =>{
		if(err){
			req.flash('error', err.message)
		}
		passport.authenticate("local")(req,res, function(){
			req.flash('success', 'You have signed up successfully')
			res.redirect('/')
		});
	});
});

// login
const loginC = (req,res) =>{
	res.render("login");
}

const login = asyncWrapper(async(req,res,next) =>{
	
	const {username,password} = req.body;

	if(!username || !password){
		req.flash('error', 'Please provide the needed credentials');
		res.redirect('/login'); 
	}
	passport.authenticate('local', (err,user,info) =>{
		if(err){
			req.flash('error', err.message);
		}
		if(!user){
			req.flash('error', "Invalid credentials")
			return res.redirect('/login?info=' + info)
		}
		const {username,role,_id:userId} = user;
        req.user = {username,role,userId}

		req.login(user, function(err){
			if(err){
				req.flash('error', "An error occured");
			}
			req.flash('success', 'You have successfully logged in')
			return res.redirect('/')
		});
	})(req,res,next);	
});


// logout route
const logout = (req,res) =>{
	req.logout();
	req.flash('error', 'Logged you out');
	res.redirect('/login')
}


module.exports = {
    signUp,
    register,
	loginC,
	login,
	logout
}



// dubemernest23
// dubemernest23