const User = require('../models/user');
const passport = require("passport");
const asyncWrapper = require('../middlewares/asyncWrapper');
const LocalStrategy = require("passport-local");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   


const signUp = (req,res) =>{
    res.render('signup')
};

const register = asyncWrapper(async(req,res) =>{
    const {username,password,email} = req.body;
	if(!username || !password || !email){
		return res.send('<p>Please provide the needed values</p>')
	}

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

	const u = await User.register({username, email, role},password, (err,user) =>{
		if(err){
				console.log(err)
				return res.render("signup")
		}
		// console.log(user)
		if(user){
			passport.authenticate("local")(req,res, function(){
				//res.send("<h3>it worked</h3>")
				res.render("new post")
			});
		}		
	}); 
	console.log(u)
	// await User.create({username,email,password,role}, (err,user) => {
	// 	if(err){
	// 		console.log(err)
	// 		return res.render("signup")
	// 	}
	// 	console.log(user)
	// 	if(user){
	// 		passport.authenticate("local")(req,res, function(){
	// 			res.send("<h3>it worked</h3>")
	// 			// res.render("new post")
	// 		});
	// 	}
	// 	// passport.authenticate("local")(req,res, function(){
	// 	// 	res.send("<h3>it worked</h3>")
	// 	// 	// res.render("new post")
	// 	// });
	// });
	

});

// login
const loginC = (req,res) =>{
	res.render("login")
}

const login = asyncWrapper(async(req,res) =>{
	
	const {username,password} = req.body;

	if(!username || !password){
		throw new Error('Enter the required values') 
	}

	await User.findOne({username}, (err, user) =>{
		if(err){
			res.render('login');
			console.log(err)
		}
		if(!user){
			throw new Error('Not a registered user, please sign up')
		}
		const isPasswordCorrect = user.comparePassword(password)
  		if (!isPasswordCorrect) {
    		throw new UnauthenticatedError('Invalid Credentials')
  		}
		// if(!user.verify(password)){
			// throw new Error('Invalid password')
		// }
		passport.authenticate('local', {
			failureRedirect: '/login',
			successRedirect: '/signup'
		});
		console.log(req.user)
	});
	// res.send("hello world")
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