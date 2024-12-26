const express = require("express");
const OrderItemController = require("../controllers/orderItem");

const orderItem = express.Router();

orderItem.get("/", OrderItemController.getOrderItems);
orderItem.post("/", OrderItemController.createOrderItem);
orderItem.get("/:order_id", OrderItemController.getOrderItemsByOrderId);
orderItem.put("/:id", OrderItemController.updateOrderItem);
orderItem.delete("/:id", OrderItemController.deleteOrderItem);

module.exports = orderItem;
