var express = require("express");
var app         = express();
var methodOverride = require("method-override");
var expressSanitizer= require("express-sanitizer");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Blog = require("./models/Blogs");



// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method")); 
app.use(require("express-session")({
	secret: "Blogapp",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   


// ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
    	if(err){
    		console.log("error");
    	} else {
    		res.render("index", {blogs: blogs});
    	}
    });
}); 

app.get("/blogs/new", isLoggedIn, function(req, res){
	res.render("new");
});

app.post("/blogs", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id",isLoggedIn, function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res .redirect("/blogs/" + req.params.id);
		}
	});
});

// delete route
app.delete("/blogs/:id", function(req, res){
	// destroy blog
	Blog.findByIdAndDelete(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	});
});

// AUTH ROUTES
// signup route
app.get("/signup", function(req, res){
	res.render("signup")
});
app.post("/signup", function(req, res){
	req.body.username
	req.body.password
	req.body.email 
	User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err, user){
		if(err){
			console.log(err)
			return res.render("signup")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/blogs/:id")
		});
	}); 
});

// login route
app.get("/login", function(req,res){
	res.render("login")
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/blogs/:id",
	failureRedirect: "/login"
}), function(req, res){

});

// logout route
app.get("/logout", function(req,res){
	req.logout()
	res.redirect("/blogs")
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/login")
}

app.listen(3000, function(){
	console.log("server started!")
});