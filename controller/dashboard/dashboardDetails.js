'use strict';

const axios = require('axios');
const userModal = require('../../models/user');

const getBlogList = async (req, res) => {
    try {
        const currentUser = await userModal.findById(req.user._id);
        const blogResponse = await axios.get(`http://localhost:${process.env.PORT || 2110}/api/user/blog/list`);
        const blogs = blogResponse.data.blogList || [];
        res.render('dashboard', { user: currentUser, blogs });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching blogs.",
            error: error.message
        });
    }

}

module.exports = getBlogList;