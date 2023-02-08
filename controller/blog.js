// const expressSanitizer= require("express-sanitizer");
const Blog = require('../models/Blogs');
const asyncWrapper = require('../middlewares/asyncWrapper');


const getAllBlogs = asyncWrapper(async(req,res) =>{
   const blogs = await Blog.find({});
    if(blogs){
        res.render('index', {blogs:blogs})
    }
    
    // console.log(blogs)
});

const newBlog = asyncWrapper(async(req,res) =>{
    res.render('new')
});

const createBlog = asyncWrapper(async(req,res) =>{
    req.body.blog.body = req.sanitize(req.body.blog.body)
    await Blog.create(req.body.blog,(err,newBlog) =>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/blogs', {blog:newBlog})
        }
        // console.log(newBlog)
    });
});

const getSingleBlog = asyncWrapper((req,res) =>{
    Blog.findById(req.params.id, (err,foundBlog) =>{
        if(err){
            res.redirect('/blogs')
            console.log(err)
        }else{
            res.render("show", {blog: foundBlog});
            // console.log(foundBlog)
        }
    });
});

const deleteBlog = asyncWrapper((req,res) =>{
    Blog.findByIdAndDelete(req.params.id, (err) =>{
        if(err){
            console.log(err)
        }else{
            console.log('successfully deleted')
            res.redirect('/blogs')
        }
    });
});

const editPost = asyncWrapper((req,res) =>{
    Blog.findById(req.params.id, (err,foundBlog) =>{
        if(err){
            console.log(err)
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
}); 


const updateBlog = asyncWrapper((req,res) =>{
    console.log('update route')
});

// app.get("/blogs/:id/edit", function(req, res){
// 	Blog.findById(req.params.id, function(err, foundBlog){
// 		if(err){
// 			res.redirect("/blogs");
// 		} else {
// 			res.render("edit", {blog: foundBlog});
// 		}
// 	});
// });

// app.put("/blogs/:id", function(req, res){
// 	req.body.blog.body = req.sanitize(req.body.blog.body);
// 	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
// 		if(err){
// 			res.redirect("/blogs");
// 		} else {
// 			res .redirect("/blogs/" + req.params.id);
// 		}
// 	});
// });


module.exports = {
    getAllBlogs,
    newBlog,
    createBlog,
    getSingleBlog,
    deleteBlog,
    editPost,
    updateBlog
}