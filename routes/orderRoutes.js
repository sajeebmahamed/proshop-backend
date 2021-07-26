// external imports
const express = require("express");
// internal imports
const {
   addOrderItems,
   getOrderById,
   updateOrderToPay,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// router instance
const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPay);

module.exports = router;
