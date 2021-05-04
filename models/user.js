const mongoose = require('mongoose');

const User_Schema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String
    },
    user_name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String
    },
    posts: {
        items: [
            {
                post_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Blog'
                }
            }
        ]
    },
    Token: {
        type: String
    },
    token_Validity: {
        type: Date,
    }
})

module.exports = mongoose.model('User',User_Schema);