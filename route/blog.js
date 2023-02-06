const express = require('express');
const {authenticate} = require('../middlewares/authenticationMiddleware');
const router = express.Router();

const {getAllBlogs,} = require('../controller/blog')

router.get('/blogs', getAllBlogs);

module.exports = router;