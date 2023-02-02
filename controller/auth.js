const User = require('../models/user');
const passport = require("passport");
const asyncWrapper = require('../middlewares/asyncWrapper');

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());   


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

	const user = await User.create({username,email,password,role});

	const token = user.createJwt()

	if(token){
		console.log(user.username)
		console.log(req.user.userId)
		console.log(user.email)
		// res.redirect("/blogs/:id")
	}

});

// app.post("/signup", function(req, res){
// 	req.body.username
// 	req.body.password
// 	req.body.email 
// 	User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err, user){
// 		if(err){
// 			console.log(err)
// 			return res.render("signup")
// 		}
// 		passport.authenticate("local")(req, res, function(){
// 			res.redirect("/blogs/:id")
// 		});
// 	}); 
// });


module.exports = {
    signUp,
    register,
}