const { Order, User, DiscountUsage } = require("../models");

class OrderController {
  // Get all orders
  static async getOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "fullname", "email"],
          },
          {
            model: DiscountUsage,
            as: "discount_usage",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // Get an order by ID
  static async getOrderById(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "fullname", "email"],
          },
          {
            model: DiscountUsage,
            as: "discount_usage",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  // Create a new order
  static async createOrder(req, res, next) {
    try {
      const { user_id, order_date, status, payment_status, shipping_fee, total_price } = req.body;

      if (!user_id || !order_date || !status || !payment_status || !total_price) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const order = await Order.create({
        user_id,
        order_date,
        status,
        payment_status,
        shipping_fee: shipping_fee || 0,
        total_price,
      });

      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      next(error);
    }
  }

  // Update an order
  static async updateOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { status, payment_status, shipping_fee, total_price } = req.body;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.update({
        status: status || order.status,
        payment_status: payment_status || order.payment_status,
        shipping_fee: shipping_fee !== undefined ? shipping_fee : order.shipping_fee,
        total_price: total_price || order.total_price,
      });

      res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
      next(error);
    }
  }

  // Delete an order
  static async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
