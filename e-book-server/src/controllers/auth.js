const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

// Register new user
exports.register = async (req, res) => {
   const { name, username, email, password } = req.body;

   try {
      let user = await Auth.findOne({ email });
      if (user) {
         return res.status(400).json({ message: "User already exists" });
      }

      user = new Auth({
         name,
         username,
         email,
         password,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, jwtSecret, {
         expiresIn: "1h",
      });

      res.status(201).json({
         token,
         user: { id: user._id, name, username, email },
      });
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

// Login user
exports.login = async (req, res) => {
   const { username, email, password } = req.body;

   try {
      const user = await Auth.findOne({ username });
      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, jwtSecret, {
         expiresIn: "1h",
      });

      console.log(token);

      res.status(200).json({
         token,
         user: { id: user._id, username: user.username, email: user.email },
      });
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

// Get user profile
exports.getProfile = async (req, res, next) => {
   try {
      const user = await Auth.findById(req.user.id).select("-password");
      res.json(user);
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

exports.showUser = (req, res, next) => {
   Auth.find()
      .countDocuments()
      .then((count) => {
         totalData = count;
         return Auth.find();
      })
      .then((result) => {
         res.status(200).json({
            message: "Success called user",
            data: result,
            total_user: totalData,
         });
      })
      .catch((err) => {
         next(err);
      });
};

// Update profile
exports.updateProfile = async (req, res, next) => {
   try {
      const user = await Auth.findById(req.user.id);

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      const { name, username, email, password } = req.body;

      // Update fields that are provided in the request
      if (name) user.name = name;
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;

      // Add other fields you might want to update
      const updatedUser = await user.save();
      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         username: updatedUser.username,
         email: updatedUser.email,
         password: updatedUser.password,
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
   }
};
