'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModal = require("../../models/user");

const checkUser = async (req, res, next) => {
    try {
        const email = req.body.email?.toLowerCase();

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        const condition = {
            isDeleted: false,
            email: email
        };

        const user = await userModal.findOne(condition);
        if (user) {
            req.data = { user };
            next();
        } else {
            return res.status(400).json({
                success: false,
                message: "No user found with given details."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error checking user.",
            error: error.message
        });
    }
};

const verifyPassword = async (req, res) => {
    try {
        const user = req.data.user;
        const password = req.body.password;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '12h' });

        if (token) {
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/api/user/dashboard-page');
        } else {
            return res.status(400).json({
                success: false,
                message: "Credentials didn't match, please enter valid credentials."
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the password.",
            error: err.message
        });
    }
};

module.exports = [checkUser, verifyPassword];
