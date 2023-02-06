// const expressSanitizer= require("express-sanitizer");
const Blog = require('../models/Blogs');
const asyncWrapper = require('../middlewares/asyncWrapper');


const getAllBlogs = asyncWrapper(async(req,res) =>{
   const blogs = await Blog.find({});
    if(blogs){
        res.render('index', {blogs:blogs})
    }
    
    console.log(blogs)
});

const newBlog = asyncWrapper(async(req,res) =>{
    res.render('new')
});

const createBlog =asyncWrapper(async(req,res) =>{
    // req.body.blog.body = req.sanitize(req.body.blog.body);
	await Blog.create(req.body, function(err, newBlog){
		if(err){
            console.log(err)
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
})

// app.get("/blogs/new",  function(req, res){
// 	res.render("new");
// });

// app.post("/blogs", function(req, res){
// 	req.body.blog.body = req.sanitize(req.body.blog.body);
// 	Blog.create(req.body.blog, function(err, newBlog){
// 		if(err){
// 			res.render("new");
// 		} else {
// 			res.redirect("/blogs");
// 		}
// 	});
// });




module.exports = {
    getAllBlogs,
    newBlog,
    createBlog,
}