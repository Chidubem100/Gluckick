
const Blog = require('../models/Blogs');
const asyncWrapper = require('../middlewares/asyncWrapper');


const getAllBlogs = asyncWrapper(async(req,res) =>{
    console.log('started')
});















// app.get("/blogs", function(req, res){
//     Blog.find({}, function(err, blogs){
//     	if(err){
//     		console.log("error");
//     	} else {
//     		res.render("index", {blogs: blogs});
//     	}
//     });
// }); 

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
}