const { Wishlist, User, Product } = require("../models");

class WishlistController {
  static async getUserWishlist(req, res, next) {
    try {
      const { userId } = req.params;

      const wishlist = await Wishlist.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Product,
            as: "product",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!wishlist || wishlist.length === 0) {
        return res.status(404).json({ message: "No wishlist found for this user" });
      }

      res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  static async addToWishlist(req, res, next) {
    try {
      const { user_id, product_id } = req.body;

      // Check if the product is already in the user's wishlist
      const existingWishlist = await Wishlist.findOne({
        where: { user_id, product_id },
      });

      if (existingWishlist) {
        return res.status(400).json({ message: "Product is already in the wishlist" });
      }

      const wishlist = await Wishlist.create({ user_id, product_id });

      res.status(201).json({
        message: "Product added to wishlist",
        wishlist,
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeFromWishlist(req, res, next) {
    try {
      const { userId, productId } = req.params;

      const wishlist = await Wishlist.findOne({
        where: { user_id: userId, product_id: productId },
      });

      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist entry not found" });
      }

      await wishlist.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async clearWishlist(req, res, next) {
    try {
      const { userId } = req.params;

      await Wishlist.destroy({
        where: { user_id: userId },
      });

      res.status(200).json({ message: "Wishlist cleared successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WishlistController;
