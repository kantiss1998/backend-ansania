const { OrderItem, Order, ProductVariant } = require("../models");

class OrderItemController {
  // Get all order items
  static async getOrderItems(req, res, next) {
    try {
      const orderItems = await OrderItem.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Order,
            as: "order",
            attributes: ["id", "order_date", "status", "total_price"],
          },
          {
            model: ProductVariant,
            as: "product_variant",
            attributes: ["id", "sku", "stock", "price"],
          },
        ],
      });

      res.status(200).json(orderItems);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderItemsByOrderId(req, res, next) {
    try {
      const { order_id } = req.params;

      const orderItems = await OrderItem.findAll({
        where: { order_id },
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: ProductVariant,
            as: "product_variant",
            attributes: ["id", "sku", "stock", "price"],
          },
        ],
      });

      if (orderItems.length === 0) {
        return res.status(404).json({ message: "No items found for this order" });
      }

      res.status(200).json(orderItems);
    } catch (error) {
      next(error);
    }
  }

  // Create a new order item
  static async createOrderItem(req, res, next) {
    try {
      const { order_id, product_variant_id, quantity, price } = req.body;

      if (!order_id || !product_variant_id || !quantity || !price) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const orderItem = await OrderItem.create({
        order_id,
        product_variant_id,
        quantity,
        price,
      });

      res.status(201).json({ message: "Order item created successfully", orderItem });
    } catch (error) {
      next(error);
    }
  }

  // Update an order item
  static async updateOrderItem(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity, price } = req.body;

      const orderItem = await OrderItem.findByPk(id);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      await orderItem.update({
        quantity: quantity || orderItem.quantity,
        price: price || orderItem.price,
      });

      res.status(200).json({ message: "Order item updated successfully", orderItem });
    } catch (error) {
      next(error);
    }
  }

  // Delete an order item
  static async deleteOrderItem(req, res, next) {
    try {
      const { id } = req.params;

      const orderItem = await OrderItem.findByPk(id);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      await orderItem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderItemController;
