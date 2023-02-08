
const Blog = require('../models/Blogs');
const asyncWrapper = require('../middlewares/asyncWrapper');


const getAllBlogs = asyncWrapper(async(req,res) =>{
   const blogs = await Blog.find({});
    if(blogs){
        res.render('index', {blogs:blogs})
    }
});

const newBlog = asyncWrapper(async(req,res) =>{
    res.render('new')
});

const createBlog = asyncWrapper(async(req,res) =>{
    // req.body.createdBy = req.user.id
    // console.log(req.body.createdBy)
    req.body.blog.body = req.sanitize(req.body.blog.body)
    await Blog.create(req.body.blog,(err,newBlog) =>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    });
});

const getSingleBlog = asyncWrapper((req,res) =>{
    Blog.findById(req.params.id, (err,foundBlog) =>{
        if(err){
            res.redirect('/blogs')
            console.log(err)
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

const deleteBlog = asyncWrapper((req,res) =>{
    Blog.findByIdAndDelete(req.params.id, (err) =>{
        if(err){
            console.log(err)
        }else{
            console.log('successfully deleted')
            res.redirect('/')
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
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, {
        new:true,
        runValidators:true
    },(err, updatedBlog)=>{
        if(err){
            console.log(err)
        }else{
            res .redirect("/blogs/" + req.params.id);
            console.log(updatedBlog)
        }
    });
});

module.exports = {
    getAllBlogs,
    newBlog,
    createBlog,
    getSingleBlog,
    deleteBlog,
    editPost,
    updateBlog
}