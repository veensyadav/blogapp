'use strict';

const blog = require("../../models/blog");

const getBlogById = async (req, res) => {
    const blogId = req.params.id;
    try {
        const blogDetails = await blog.findOne({ _id: blogId, isDeleted: { $ne: true } });
        if (!blogDetails) {
            return res.status(404).send("Blog not found.");
        }

        res.render('viewBlog', { blog: blogDetails });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching blog.",
            error: error.message
        });
    }

}

module.exports = getBlogById;