const express = require("express");
const WishlistController = require("../controllers/wishlist");

const wishlist = express.Router();

wishlist.get("/:user_id", WishlistController.getUserWishlist);
wishlist.delete("/:user_id", WishlistController.clearWishlist);
wishlist.post("/:user_id/:product_id", WishlistController.addToWishlist);
wishlist.delete(
  "/:user_id/:product_id",
  WishlistController.removeFromWishlist
);

module.exports = wishlist;
