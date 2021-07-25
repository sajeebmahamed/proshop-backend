// external imports 
const express = require('express')
// internal imports
const { getProducts, getProductById } = require('../controllers/productController')

// router instance 
const router = express.Router()


router.get('/', getProducts)


router.get('/:id', getProductById)

module.exports = router