const express = require('express');
const router = express.Router();
// const isLoggedIn = require('../middlewares/isLoggedIn');

const {
	signUp,
	register,
} = require('../controller/auth');

router.route('/signup').get(signUp).post(register);

// signup route
// app.get("/signup", function(req, res){
// 	res.render("signup")
// });
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


module.exports = router;