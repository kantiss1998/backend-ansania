const { Cart } = require("../models");

class CartController {
  static async getUserCart(req, res, next) {
    try {
      const { userId } = req.params;

      const cart = await Cart.findAll({
        where: { user_id: userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!cart || cart.length === 0) {
        return res.status(404).json({ message: "Cart is empty" });
      }

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const { user_id, product_variant_id, quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const existingCart = await Cart.findOne({
        where: { user_id, product_variant_id },
      });

      if (existingCart) {
        existingCart.quantity += quantity;
        await existingCart.save();
        return res.status(200).json({
          message: "Product quantity updated in cart",
          cart: existingCart,
        });
      }

      const cart = await Cart.create({ user_id, product_variant_id, quantity });

      res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req, res, next) {
    try {
      const { cartId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      cart.quantity = quantity;
      await cart.save();

      res.status(200).json({
        message: "Cart item updated successfully",
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const { cartId } = req.params;

      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      await cart.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async clearCart(req, res, next) {
    try {
      const { userId } = req.params;

      await Cart.destroy({
        where: { user_id: userId },
      });

      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
