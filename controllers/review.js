const { Review, User, Product } = require("../models");

class ReviewController {
  static async getProductReviews(req, res, next) {
    try {
      const { product_variant_id } = req.params;

      const reviews = await Review.findAll({
        where: { product_variant_id: product_variant_id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "fullname"],
          },
        ],
        attributes: { exclude: ["updatedAt"] },
      });

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this product" });
      }

      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  static async addReview(req, res, next) {
    try {
      const { user_id, product_variant_id, rating, comment } = req.body;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }

      const existingReview = await Review.findOne({
        where: { user_id, product_variant_id },
      });

      if (existingReview) {
        return res.status(409).json({ message: "You have already reviewed this product" });
      }

      const review = await Review.create({ user_id, product_variant_id, rating, comment });

      res.status(201).json({
        message: "Review added successfully",
        review,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateReview(req, res, next) {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;

      if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }

      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      await review.update({ rating: rating || review.rating, comment: comment || review.comment });

      res.status(200).json({
        message: "Review updated successfully",
        review,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      await review.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
