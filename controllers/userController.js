// external imports
const asyncHandler = require("express-async-handler");
const { getWelcomeMailTemplate } = require("../email/templates");
const nodemailer = require("nodemailer");
// internal imports
const User = require("../models/userModel");
const sms = require("../sms");
const generateToken = require("../utils/generateToken");
const transporter = require("../email/transporter");

/**
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   const userExists = await User.findOne({ email });

   if (userExists) {
      res.status(400);
      throw new Error("User already exists");
   }

   const user = await User.create({
      name,
      email,
      password,
   });

   if (user) {
      // setup email data with unicode symbols
      let mailOptions = {
         from: '"Proshop" <sajeebmahamed@email.com>',
         to: user.email,
         subject: "Registration successfull",
         html: getWelcomeMailTemplate(user),
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
         }
         console.log("Message sent: %s", info.messageId);
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
         console.log(info);
      });

      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

/**
 * @desc Auth user & get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password.");
   }
});

/**
 * @desc get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

/**
 * @desc update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
         user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser._id),
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

/**
 * @desc get all user
 * @route GET /api/users
 * @access Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
   const user = await User.find({});
   res.json(user);
});

/**
 * @desc delete a user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);
   if (user) {
      await user.remove();
      res.json({ message: "User removed" });
   } else {
      res.status(404);
      throw new Error("User not found.");
   }
});

/**
 * @desc get user by id
 * @route GET /api/users/:id
 * @access Private/Admin
 */

const getUserById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id).select("-password");

   if (user) {
      res.json(user);
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

/**
 * @desc update a user
 * @route PUT /api/users/:id
 * @access Private/Admin
 */

const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

module.exports = {
   authUser,
   getUserProfile,
   registerUser,
   updateUserProfile,
   getAllUsers,
   deleteUser,
   getUserById,
   updateUser,
};
