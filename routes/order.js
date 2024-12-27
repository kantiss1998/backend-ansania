const express = require("express");
const OrderController = require("../controllers/order");

const order = express.Router();

order.get("/", OrderController.getOrders);
order.post("/", OrderController.createOrder);
order.get("/:id", OrderController.getOrderById);
order.put("/:id", OrderController.updateOrder);
order.delete("/:id", OrderController.deleteOrder);

module.exports = order;
