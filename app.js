const express = require("express");
const app         = express();
const methodOverride = require("method-override");
const expressSanitizer= require("express-sanitizer");
const bodyParser  = require("body-parser");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
// const Blog = require("./models/Blogs");


const notFound = require('./middlewares/NotFound');
const errorHandler =require('./middlewares/errorMid');
const connectDB = require('./db/connection');
const authRouter = require('./route/auth');
// APP CONFIG

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSanitizer());
app.use(methodOverride("_method")); 
app.use(require("express-session")({
	secret: "cfdfddfd",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());   

app.use(authRouter);

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

app.get("/blogs/new",  function(req, res){
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

app.get("/blogs/:id", function(req, res){
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


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000

const start = async() =>{
	try {
		await connectDB()
		app.listen(port, () =>{
			console.log(`server have started on ${port}`)
		});
	} catch (error) {
		console.log(error)
	}
}

start();
