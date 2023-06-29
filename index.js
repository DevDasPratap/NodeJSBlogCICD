const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 4200
mongoose.connect('mongodb://localhost:27017/node_blog')
const isBlog = require('./middlewares/isBlog')
app.use(isBlog.isBlog)

// admin route
const adminRoute = require('./routes/adminRouting')
app.use('/', adminRoute)

// user route
const userRoute = require('./routes/userRoute')
app.use('/', userRoute)



app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})