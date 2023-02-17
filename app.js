require('dotenv').config();

const express = require("express");
const methodOverride = require("method-override");
const expressSanitizer= require("express-sanitizer");
const bodyParser  = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path')
const notFound = require('./middlewares/NotFound');
const errorHandler =require('./middlewares/errorMid');
const connectDB = require('./db/connection');
const authRouter = require('./route/auth');
const blogRouter = require('./route/blog');
const User = require('./models/user');
const {currentUser} = require('./middlewares/currentUser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app   = express();


// APP CONFIG
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cookieParser(process.env.SECRET));
app.use(flash()); 
app.use(require("express-session")({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(currentUser);


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   

// ROUTES
app.use(authRouter);
app.use(blogRouter);

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
