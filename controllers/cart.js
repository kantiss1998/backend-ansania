const { Cart } = require("../models");

class CartController {
  static async getCart(req, res, next) {
    try {
      const cart = await Cart.findAll(req.params.id);
      res.status(200).json(cart);
      next();
    } catch (error) {
      res.status(404).json({ message: "Cart not found" });
      next(error);
    }
  }
}
