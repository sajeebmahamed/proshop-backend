// external imports
const express = require("express");
// internal imports
const {
   addOrderItems,
   getOrderById,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// router instance
const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);

module.exports = router;
