const mongoose = require('mongoose')

const blogSetting = mongoose.Schema({
    blog_title: {
        type: String,
        required: true
    },
    blog_logo: {
        type: String,
        required: true
    },
    blog_title: {
        type: String,
        required: true
    },
    blog_description: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('BlogSetting', blogSetting)