const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class Helpers {
  static hashPassword = (password) => {
    const result = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    return result;
  };

  static comparePassword = (password, databasePassword) => {
    const result = bcrypt.compareSync(password, databasePassword);
    return result;
  };

  static generateToken = (payload) => {
    console.log(process.env)
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  };

  static validateToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  };

  static generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

module.exports = Helpers;