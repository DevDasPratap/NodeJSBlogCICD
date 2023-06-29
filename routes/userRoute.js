const express = require('express')
const user_route = express()

const bodyParser = require('body-parser')
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended:true}))

const session = require('express-session')
const config = require('../config/config')
user_route.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}))

// middleware
const adminLoginAuth = require('../middlewares/adminLoginAuth')

user_route.set('view engine', 'ejs')
user_route.set('views', './views')
user_route.use(express.static('public'))
const userController = require('../controllers/userController')
user_route.get('/login', adminLoginAuth.isLogOut, userController.loadLogin)
user_route.post('/login', userController.verifyLgin)

user_route.get('/profile', userController.profile)
user_route.get('/logout', adminLoginAuth.isLogin, userController.logout)

module.exports = user_route