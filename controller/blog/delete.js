'use strict';

const blog = require("../../models/blog");

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    try {
        const blogDetails = await blog.updateOne({ _id: blogId }, { $set: { isDeleted: true } });
        if (blogDetails.modifiedCount > 0) {
            return res.redirect('/api/user/dashboard-page');
        } else {
            return res.status(400).json({
                success: false,
                message: "Enable to delete blog."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting blog.",
            error: error.message
        });
    }

}

module.exports = deleteBlog;