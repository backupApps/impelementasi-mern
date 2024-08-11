const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.get("/user", authControllers.showUser);
router.get("/profile", protect, authControllers.getProfile);
router.put("/profile", protect, authControllers.updateProfile);

module.exports = router;
