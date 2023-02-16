const User = require('../models/user');
const passport = require("passport");
const asyncWrapper = require('../middlewares/asyncWrapper');

const signUp = (req,res) =>{
    res.render('signup')
};

const register = asyncWrapper(async(req,res) =>{
    const {username,email, password} = req.body;
	if(!username || !email || !password){
		req.flash('error', 'Please provide the needed values');
		res.redirect('/signup');
		// return res.send('<p>Please provide the needed values</p>')
	}
	if(password.length < 6){
		req.flash('error', 'Password must be morre than 6 characters');
		res.redirect('/signup');
		// throw new Error('Password should not be less than 6 characters');
	}
	const emailAlreadyExist = await User.findOne({email})
	if(emailAlreadyExist){
		req.flash('error', 'Email already taken, Please pick another username');
		res.redirect('/signup');
		// return res.send("Email already exist, user another email")
	}

	const usernameAlreadyExist = await User.findOne({username})
	if(usernameAlreadyExist){
		req.flash('error', 'Username already taken, Please pick another username');
		res.redirect('/signup')
		// return res.send("Username already exist")
	}

	const isAdmin = await User.countDocuments({}) === 0;
	const role = isAdmin ? 'admin' : 'user';	

	await User.register(new User({username,email,role}),req.body.password, (err,user) =>{
		if(err){
			req.flash('error', err.message)
		}
		passport.authenticate("local")(req,res, function(){
			req.flash('sucess', 'You have signed up successfully')
			res.redirect('/')
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
		req.flash('error', 'Please provide the needed values');
		res.redirect('/login')
		// throw new Error('Enter the required values') 
	}
	passport.authenticate('local', (err,user,info) =>{
		if(err){
			req.flash('error', err.message);
		}
		if(!user){
			req.flash('error', "User doesn't exist")
			return res.redirect('/login?info=' + info)
		}
		const {username,role,_id:userId} = user;
        req.user = {username,role,userId}

		req.login(user, function(err){
			if(err){
				req.flash('error', "An error occured")
				// console.log(err)
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