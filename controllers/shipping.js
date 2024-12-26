const { Shipping, Order } = require("../models");

class ShippingController {
  // Get all shipping records
  static async getAllShipping(req, res, next) {
    try {
      const shippingRecords = await Shipping.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Order,
            as: "order",
            attributes: ["id", "user_id", "status", "total_price"],
          },
        ],
      });

      res.status(200).json(shippingRecords);
    } catch (error) {
      next(error);
    }
  }

  // Get shipping record by ID
  static async getShippingById(req, res, next) {
    try {
      const { id } = req.params;
      const shippingRecord = await Shipping.findByPk(id, {
        include: [
          {
            model: Order,
            as: "order",
            attributes: ["id", "user_id", "status", "total_price"],
          },
        ],
      });

      if (!shippingRecord) {
        return res.status(404).json({ message: "Shipping record not found" });
      }

      res.status(200).json(shippingRecord);
    } catch (error) {
      next(error);
    }
  }

  // Create a new shipping record
  static async createShipping(req, res, next) {
    try {
      const { order_id, address, province, city, postal_code, courier } = req.body;

      // Validate order existence
      const order = await Order.findByPk(order_id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const shippingRecord = await Shipping.create({
        order_id,
        address,
        province,
        city,
        postal_code,
        courier,
        shipping_date: new Date(),
        status: "PENDING", // Default status
      });

      res.status(201).json(shippingRecord);
    } catch (error) {
      next(error);
    }
  }

  // Update shipping status
  static async updateShippingStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, tracking_number } = req.body;

      const shippingRecord = await Shipping.findByPk(id);
      if (!shippingRecord) {
        return res.status(404).json({ message: "Shipping record not found" });
      }

      await shippingRecord.update({ status, tracking_number });
      res.status(200).json(shippingRecord);
    } catch (error) {
      next(error);
    }
  }

  // Delete shipping record
  static async deleteShipping(req, res, next) {
    try {
      const { id } = req.params;
      const shippingRecord = await Shipping.findByPk(id);

      if (!shippingRecord) {
        return res.status(404).json({ message: "Shipping record not found" });
      }

      await shippingRecord.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ShippingController;
