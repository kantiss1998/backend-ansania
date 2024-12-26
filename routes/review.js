const express = require("express");
const ReviewController = require("../controllers/review");

const review = express.Router();

review.post("/", ReviewController.addReview);
review.get("/:product_variant_id", ReviewController.getProductReviews);
review.put("/:id", ReviewController.updateReview);
review.delete("/:id", ReviewController.deleteReview);

module.exports = review;
