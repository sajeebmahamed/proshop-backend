// external imports 
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

// internal imports
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

// init app
dotenv.config()

// db connect
connectDB()

const app = express()

// init morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// request parser
app.use(express.json())

// routing setup
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

// 404 not found handler
app.use(notFound)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT || 6000, () => {
  console.log(`Example app listening at ${process.env.PORT}`)
})
