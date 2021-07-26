// external imports
const express = require("express");
// internal imports
const { addOrderItems } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// router instance
const router = express.Router();

router.route("/").post(protect, addOrderItems);

module.exports = router;
