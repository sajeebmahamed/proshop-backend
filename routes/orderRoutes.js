// external imports
const express = require("express");
// internal imports
const {
   addOrderItems,
   getOrderById,
   updateOrderToPay,
   getOrders,
   getMyOrders,
   updateOrderToDelivered,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// router instance
const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPay);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
