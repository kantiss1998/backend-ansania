const { DiscountUsage, User, Order, Discount } = require("../models");

class DiscountUsageController {
  static async getDiscountUsages(req, res, next) {
    try {
      const discountUsages = await DiscountUsage.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          { model: User, attributes: ["id", "fullname", "email"] },
          { model: Order, attributes: ["id", "order_number"] },
          { model: Discount, attributes: ["id", "name", "code", "discount_amount"] },
        ],
      });
      res.status(200).json(discountUsages);
    } catch (error) {
      next(error);
    }
  }

  static async getDiscountUsage(req, res, next) {
    try {
      const { id } = req.params;

      const discountUsage = await DiscountUsage.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          { model: User, attributes: ["id", "fullname", "email"] },
          { model: Order, attributes: ["id", "order_number"] },
          { model: Discount, attributes: ["id", "name", "code", "discount_amount"] },
        ],
      });

      if (!discountUsage) {
        return res.status(404).json({ message: "Discount usage not found" });
      }

      res.status(200).json(discountUsage);
    } catch (error) {
      next(error);
    }
  }

  static async createDiscountUsage(req, res, next) {
    try {
      const { user_id, order_id, discount_id, usage_date, status } = req.body;

      const discountUsage = await DiscountUsage.create({
        user_id,
        order_id,
        discount_id,
        usage_date,
        status,
      });

      res.status(201).json({
        message: "Discount usage created successfully",
        discountUsage,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateDiscountUsage(req, res, next) {
    try {
      const { id } = req.params;
      const { user_id, order_id, discount_id, usage_date, status } = req.body;

      const discountUsage = await DiscountUsage.findByPk(id);

      if (!discountUsage) {
        return res.status(404).json({ message: "Discount usage not found" });
      }

      await discountUsage.update({
        user_id: user_id || discountUsage.user_id,
        order_id: order_id || discountUsage.order_id,
        discount_id: discount_id || discountUsage.discount_id,
        usage_date: usage_date || discountUsage.usage_date,
        status: status || discountUsage.status,
      });

      res.status(200).json({
        message: "Discount usage updated successfully",
        discountUsage,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDiscountUsage(req, res, next) {
    try {
      const { id } = req.params;

      const discountUsage = await DiscountUsage.findByPk(id);

      if (!discountUsage) {
        return res.status(404).json({ message: "Discount usage not found" });
      }

      await discountUsage.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DiscountUsageController;
