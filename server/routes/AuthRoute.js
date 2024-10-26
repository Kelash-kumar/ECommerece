const { Register, Login, Logout } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
module.exports = router;
