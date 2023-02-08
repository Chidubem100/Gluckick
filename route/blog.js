const express = require('express');
const {isLoggedIn,authorization} = require('../middlewares/authenticationMiddleware');
const router = express.Router();

const {getAllBlogs,newBlog,createBlog,getSingleBlog,deleteBlog,updateBlog,editPost} = require('../controller/blog')

router.get('/', getAllBlogs);
router.get('/blogs/new', isLoggedIn,authorization('admin'),newBlog);
router.post('/blogs',isLoggedIn ,authorization('admin'),createBlog);
router.route('/blogs/:id').get(getSingleBlog).delete(isLoggedIn,authorization('admin'),deleteBlog).put(isLoggedIn,authorization('admin'),updateBlog);
router.get('/blogs/:id/edit', isLoggedIn,authorization('admin'),editPost)


module.exports = router;