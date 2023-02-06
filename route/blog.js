const express = require('express');
const {authenticate} = require('../middlewares/authenticationMiddleware');
const router = express.Router();

const {getAllBlogs,newBlog,createBlog} = require('../controller/blog')

router.get('/blogs', getAllBlogs);
router.get('/blogs/new', newBlog);
router.post('/blogs', createBlog);

module.exports = router;