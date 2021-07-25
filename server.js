// external imports 
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')


// internal imports
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

// init app
dotenv.config()

// db connect
connectDB()

const app = express()

// request parser
app.use(express.json())

// routing setup
app.use('/api/products', productRoutes)

app.get("/", (req, res) => {
    res.send('Hello')
})

// 404 not found handler
app.use(notFound)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT || 6000, () => {
  console.log(`Example app listening at ${process.env.PORT}`)
})
