// external imports 
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')


// internal imports
const connectDB = require('./config/db')

// init app
dotenv.config()

// db connect
connectDB()

const app = express()

app.get("/", (req, res) => {
    res.send('Hello')
})

app.listen(process.env.PORT || 6000, () => {
  console.log(`Example app listening at ${process.env.PORT}`)
})
