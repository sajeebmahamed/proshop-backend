// external imports
const express = require('express')
const asyncHandler = require('express-async-handler')

// internal imports 
const Product = require('../models/productModel')

// router instance 
const router = express.Router()

/**
 * @desc Fetch all Products
 * @route GET /api/products
 * @access Public
 */
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

/**
 * @desc Fetch a Product
 * @route GET /api/products/:id
 * @access Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found!' })
    }
}))

module.exports = router