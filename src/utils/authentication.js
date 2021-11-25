const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign({ ...user }, secretKey, { expiresIn: "1d" });
};

module.exports = { createToken };
