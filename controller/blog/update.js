'use strict';

const blog = require("../../models/blog");

const updateBlog = async (req, res) => {
    const { title, description, fullContent, blogId } = req.body;
    const payload = {
        title,
        description,
        fullContent,
    };
    if (req.file) payload.image = req.file.filename;
    const condition = {
        _id: blogId
    }
    try {
        const blogDetails = await blog.updateOne(condition, payload);
        if (blogDetails.modifiedCount > 0) {
            res.redirect('/api/user/dashboard-page');
        } else {
            return res.status(400).json({
                success: false,
                message: "Enable to update blog."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating blog.",
            error: error.message
        });
    }

}

module.exports = updateBlog;