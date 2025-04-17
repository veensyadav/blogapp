'use strict';

const bcrypt = require('bcryptjs');
const userModal = require('../../models/user');

const checkUser = async (req, res, next) => {
    try {
        const email = req.body.email?.toLowerCase();

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error checking user existence.",
            error: error.message
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const payload = {
            email: email.toLowerCase(),
            password: hashedPassword,
            profileImage: req.file.filename,
        };

        await userModal.create(payload);

        return res.redirect('/api/user/login-page');

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occurred during registration.",
            error: err.message
        });
    }
};

module.exports = [checkUser, createUser];
