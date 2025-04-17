'use strict';

const blog = require("../../models/blog");

const getBlogs = async (req, res) => {
    try {
        const blogList = await blog.find(
            { isDeleted: false }
        ).sort({ createdAt: -1 });
        if (blogList) {
            return res.json({
                success: true,
                message: "Blogs fetched successful.",
                blogList
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Enable to fetch blogs."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching blogs.",
            error: error.message
        });
    }

}

module.exports = getBlogs;