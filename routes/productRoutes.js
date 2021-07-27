// external imports
const express = require("express");
// internal imports
const {
   getProducts,
   getProductById,
   deleteProduct,
   createProduct,
   updateProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// router instance
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
   .route("/:id")
   .get(getProductById)
   .delete(protect, admin, deleteProduct)
   .put(protect, admin, updateProduct);

module.exports = router;
