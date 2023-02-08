const express = require('express');
const {authenticate,authorization} = require('../middlewares/authenticationMiddleware');
const router = express.Router();

const {getAllBlogs,newBlog,createBlog,getSingleBlog,deleteBlog,updateBlog,editPost} = require('../controller/blog')

router.get('/blogs', getAllBlogs);
router.get('/blogs/new', newBlog);
router.post('/blogs', createBlog);
router.route('/blogs/:id').get(getSingleBlog).delete(deleteBlog).put(updateBlog);
router.get('/blogs/:id/edit', editPost)


module.exports = router;