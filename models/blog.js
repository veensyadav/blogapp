'use strict';

const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose)

const blogSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    fullContent: { type: String },
    createdBy: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true }
);

blogSchema.plugin(autoIncrement, { inc_field: 'id', id: "blogId" })
module.exports = mongoose.model("blog", blogSchema) 