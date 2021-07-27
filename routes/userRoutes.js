// external imports
const express = require("express");
// internal imports
const {
   authUser,
   getUserProfile,
   registerUser,
   updateUserProfile,
   getAllUsers,
   deleteUser,
   updateUser,
   getUserById,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// router instance
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router.post("/login", authUser);
router
   .route("/profile")
   .get(protect, getUserProfile)
   .put(protect, updateUserProfile);

router
   .route("/:id")
   .delete(protect, admin, deleteUser)
   .get(protect, admin, getUserById)
   .put(protect, admin, updateUser);

module.exports = router;
