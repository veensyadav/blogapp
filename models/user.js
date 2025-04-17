'use strict';

const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose)

const userSchema = new mongoose.Schema({
    id: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true }
);

userSchema.plugin(autoIncrement, { inc_field: 'id', id: "userId" })
module.exports = mongoose.model("user", userSchema) 