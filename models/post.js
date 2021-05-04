const mongoose = require('mongoose');

const Blog_Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    read_Count: {
        required: true,
        type: Number,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Blog',Blog_Schema);