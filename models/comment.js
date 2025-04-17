'use strict';

const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose)

const commentSchema = new mongoose.Schema({
    id: { type: Number },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'blog' },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: null },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true }
);

commentSchema.plugin(autoIncrement, { inc_field: 'id', id: "commentId" })
module.exports = mongoose.model("comment", commentSchema) 