const mongoose = require('mongoose')
const express = require('express')

const app = express()
const port = 4200
mongoose.connect('mongodb://localhost:27017/node_blog')

app.get('/', (req, res)=>{
    res.send('Hi')
})



app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})