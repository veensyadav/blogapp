'use strict';

const blog = require("../../models/blog");

const createBlog = async (req, res) => {
    const { title, description, fullContent } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and Description are required' });
    }
    const payload = {
        title: title,
        description: description,
        fullContent: fullContent,
        image: req.file?.filename || '',
        createdBy: req.user.email
    }
    try {
        const blogDetails = await blog.create(payload);
        if (blogDetails) {
            res.redirect('/api/user/dashboard-page');
        } else {
            return res.status(400).json({
                success: false,
                message: "Enable to create blog."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating blog.",
            error: error.message
        });
    }

}

module.exports = createBlog;