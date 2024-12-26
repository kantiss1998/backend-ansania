const express = require("express");
const DiscountUsageController = require("../controllers/discountUsage");

const discountUsage = express.Router();

discountUsage.get("/", DiscountUsageController.getDiscountUsages);
discountUsage.post("/", DiscountUsageController.createDiscountUsage);
discountUsage.get("/:id", DiscountUsageController.getDiscountUsage);
discountUsage.put("/:id", DiscountUsageController.updateDiscountUsage);
discountUsage.delete("/:id", DiscountUsageController.deleteDiscountUsage);

module.exports = discountUsage;
