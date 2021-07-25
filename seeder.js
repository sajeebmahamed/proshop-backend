// external imports
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
// internal imports
const users = require('./data/users')
const products = require('./data/products')
const connectDB = require('./config/db')
// model
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')

// config env
dotenv.config()
// connect db
connectDB()

// data import function
const importData = async () => {
  try {
      // clear db if have existing data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // create user
    const createdUsers = await User.insertMany(users)

    // create admin
    const adminUser = createdUsers[0]._id

    // add adminUser with products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    // insert products
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// delete all data from db
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

/**
 * "data:import": "node seeder",
 *  "data:destroy": "node seeder -d",
 */

// call function
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}