const BlogSetting = require('../models/blogSettingModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const bcrypt = require('bcrypt')

// make method
// const login = async (req, res) => {
//     res.send('Login')
// }
const blogSetup = async (req, res) => {
    try {
        const blogSetting = await BlogSetting.find({})
        if (blogSetting.length > 0) {
            res.redirect('/login')
        } else {
            res.render('blogSetup')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.oog(error.message)
    }
}
const blogSetupSave = async (req, res) => {
    try {
        const blog_title = req.body.blog_title
        const blog_image = req.file.filename
        const description = req.body.description
        const name = req.body.admin_name
        const email = req.body.email
        const password = await securePassword(req.body.password)

        // blog details model
        const blogSetting = new BlogSetting({
            blog_title: blog_title,
            blog_logo: blog_image,
            blog_description: description,
        })
        const blogData = await blogSetting.save()
        // admin details model
        const user = new User({
            name: name,
            email: email,
            password: password,
            isAdmin: 1
        })
        const userData = await user.save()
        if (userData) {
            res.redirect('/login')
        } else {
            res.render('blogSetup', { message: 'Blog not setup properly' })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const dashbord = async (req, res) => {
    try {
        res.render('admin/dashbord')
    } catch (error) {
        console.log(error.message)
    }
}
const loadPostDashbord = async (req, res) => {
    try {
        res.render('admin/postDashbord')
    } catch (error) {
        console.log(error.message)
    }
}

const addPost = async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        })
        const postData = await post.save()
        res.render('admin/postDashbord', {message:'Post added'})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    // login,
    blogSetup,
    blogSetupSave,
    dashbord,
    loadPostDashbord,
    addPost
}