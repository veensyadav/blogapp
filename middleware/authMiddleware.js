'use strict';

const jwt = require('jsonwebtoken');
const userModal = require('../models/user');

const tokenVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/api/user/login-page');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await userModal.findOne({ _id: decoded.id });

        if (!user) {
            return res.redirect('/api/user/login-page');
        }

        req.user = user;
        next();
    } catch (error) {
        return res.redirect('/api/user/login-page');
    }
};

module.exports = tokenVerification;
