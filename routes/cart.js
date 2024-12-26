const express = require("express");
const CartController = require("../controllers/cart");

const cart = express.Router();

cart.post("/", CartController.addToCart);
cart.get("/:userId", CartController.getUserCart);
cart.put("/:cartId", CartController.updateCart);
cart.delete("/:cartId", CartController.removeFromCart);
cart.delete("/:userId", CartController.clearCart);

module.exports = cart;
