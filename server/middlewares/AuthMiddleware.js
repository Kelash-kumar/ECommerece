const User = require("../model/User.model");
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  let token;

  if (req.cookies.token || req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.cookies.token || req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.id = decoded.id;

      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Not authorized, token failed", err: error.message });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token!" });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(401).json({ message: `Not authorized as an ${role}` });
    }
  };
};

module.exports = { authenticateToken, authorizeRole };
