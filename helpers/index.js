const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class Helpers {
  static hashPassword = (password) => {
    const result = bcrypt.hashSync(password, 10);
    return result;
  };

  static comparePassword = (password, databasePassword) => {
    const result = bcrypt.compareSync(password, databasePassword);
    return result;
  };

  static generateToken = (payload) => {
    const token = jwt.sign(payload, "anotherbem");
    return token;
  };

  static validateToken = (token) => {
    const decoded = jwt.verify(token, "anotherbem");
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