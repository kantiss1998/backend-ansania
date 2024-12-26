const { Discount } = require("../models");

class DiscountController {
  // Get all discounts
  static async getDiscounts(req, res, next) {
    try {
      const discounts = await Discount.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      res.status(200).json(discounts);
    } catch (error) {
      next(error);
    }
  }

  // Get a single discount
  static async getDiscount(req, res, next) {
    try {
      const { id } = req.params;
      const discount = await Discount.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
      });

      if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
      }

      res.status(200).json(discount);
    } catch (error) {
      next(error);
    }
  }

  // Create a new discount
  static async createDiscount(req, res, next) {
    try {
      const { name, code, promotion_period, description, discount_amount, is_active } = req.body;

      // Check if the code is unique
      const existingCode = await Discount.findOne({ where: { code } });
      if (existingCode) {
        return res.status(409).json({ message: "Discount code already exists" });
      }

      const discount = await Discount.create({
        name,
        code,
        promotion_period,
        description,
        discount_amount,
        is_active,
      });

      res.status(201).json({
        message: "Discount created successfully",
        discount,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update an existing discount
  static async updateDiscount(req, res, next) {
    try {
      const { id } = req.params;
      const { name, code, promotion_period, description, discount_amount, is_active } = req.body;

      const discount = await Discount.findByPk(id);

      if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
      }

      if (code) {
        const existingCode = await Discount.findOne({
          where: { code, id: { [Op.ne]: id } },
        });

        if (existingCode) {
          return res.status(409).json({ message: "Discount code already exists" });
        }
      }

      await discount.update({
        name: name || discount.name,
        code: code || discount.code,
        promotion_period: promotion_period || discount.promotion_period,
        description: description || discount.description,
        discount_amount: discount_amount || discount.discount_amount,
        is_active: is_active !== undefined ? is_active : discount.is_active,
      });

      res.status(200).json({
        message: "Discount updated successfully",
        discount,
      });
    } catch (error) {
      next(error);
    }
  }

  // Upload image for discount
  static async uploadImageDiscount(req, res, next) {
    try {
      const { id } = req.params;

      const discount = await Discount.findByPk(id);

      if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = `https://yourdomain.com/discounts/${req.file.filename}`;
      await discount.update({ image_url: filePath });

      res.status(200).json({ message: "Image uploaded successfully", image_url: filePath });
    } catch (error) {
      next(error);
    }
  }

  // Delete a discount
  static async deleteDiscount(req, res, next) {
    try {
      const { id } = req.params;

      const discount = await Discount.findByPk(id);

      if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
      }

      await discount.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DiscountController;
