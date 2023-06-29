const express = require('express')
const admin_route = express()

const bodyParser = require('body-parser')
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({extended:true}))

admin_route.set('view engine', 'ejs')
admin_route.set('views', './views')

const multer = require('multer')
const path = require('path')

admin_route.use(express.static('public'))

// image upload
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename:function (req, file, cb) {
        const name = Date.now()+'-'+file.originalname
        cb(null, name)
    }
})

const session = require('express-session')
const config = require('../config/config')
admin_route.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}))
// middleware
const adminLoginAuth = require('../middlewares/adminLoginAuth')

const upload = multer({storage:storage})

const admin_controller = require('../controllers/adminController')
const { name } = require('ejs')
// admin_route.get('/login', admin_controller.login)
admin_route.get('/blog-setup', admin_controller.blogSetup)
admin_route.post('/blog-setup', upload.single('blog_image'), admin_controller.blogSetupSave)

admin_route.get('/dashbord', adminLoginAuth.isLogin, admin_controller.dashbord)
admin_route.get('/create-post', adminLoginAuth.isLogin, admin_controller.loadPostDashbord)
admin_route.post('/create-post', adminLoginAuth.isLogin, admin_controller.addPost)
module.exports = admin_route