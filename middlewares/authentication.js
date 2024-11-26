const Helpers = require('../helpers');
const { User } = require('../models');

const resetTokens = new Map();

class Authentication {
  static async isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = Helpers.validateToken(token)
      
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
    }
  }

  static validateResetToken(req, res, next) {
    const { token } = req.body;
    
    const tokenData = resetTokens.get(token);
    
    if (!tokenData || tokenData.expiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    req.resetTokenData = tokenData;
    next();
  }

  static storeResetToken(userId) {
    const resetToken = Helpers.generateResetToken();
    
    resetTokens.set(resetToken, {
      userId,
      expiry: Date.now() + 3600000 
    });

    return resetToken;
  }

  static clearResetToken(token) {
    resetTokens.delete(token);
  }
}

module.exports = Authentication;