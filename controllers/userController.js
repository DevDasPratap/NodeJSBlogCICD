const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const loadLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}

const verifyLgin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        // verify login details
        const userData = await User.findOne({ email: email })
        if (userData) {
            console.log(userData)
            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {
                req.session.user_id = userData._id
                req.session.isAdmin = userData.isAdmin
                if (userData.isAdmin == 1) {
                    res.redirect('/dashbord')
                } else {
                    res.redirect('/profile')
                }
            } else {
                res.render('login', { message: 'Email and password incorrect' })
            }
        } else {
            res.render('login', { message: 'Email and password incorrect' })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const profile = async (req, res) => {
    try {
        res.send('profile here')
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async(req, res)=>{
    try {
        req.session.destroy()
        res.redirect('/login')
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    loadLogin,
    verifyLgin,
    profile,
    logout
}