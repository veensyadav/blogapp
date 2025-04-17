'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const blog = require('../models/blog');


// login routes
const login = require('../controller/auth/login');
const signUp = require('../controller/auth/signUp');

// blogs
const createBlog = require('../controller/blog/create')
const getAllBlogs = require('../controller/blog/list')
const getBlogById = require('../controller/blog/getBlogById')
const updateBlog = require('../controller/blog/update')
const deleteBlog = require('../controller/blog/delete');


router.post('/login', login);
router.post('/signup', upload.single('profileImage'), signUp);

router.get('/signup-page', (req, res) => {
    res.render('signup');
});

router.get('/login-page', (req, res) => {
    res.render('login');
});

const authMiddleware = require('../middleware/authMiddleware')
// router.use(authMiddleware)

//dashboard
const getDashboard = require('../controller/dashboard/dashboardDetails')
router.get('/dashboard-page', authMiddleware, getDashboard);



router.get('/blog', (req, res) => {
    res.render('addBlog');
});

router.get('/blog/edit/:id', authMiddleware, async (req, res) => {
    const blogData = await blog.findById(req.params.id);
    res.render('editBlog', { blogData });
});




router.post('/blog/create', authMiddleware, upload.single('image'), createBlog);
router.get('/blog/list', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/update', upload.single('image'), updateBlog);
router.delete('/blog/delete/:id', deleteBlog);



module.exports = router