const express = require("express");
const DiscountController = require("../controllers/discount");
const checkFolder = require("../utils/checkFolder");
const upload = require("../utils/upload");

const discount = express.Router();

discount.get("/", DiscountController.getDiscounts);
discount.post("/", DiscountController.createDiscount);
discount.get("/:id", DiscountController.getDiscounts);
discount.put("/:id", DiscountController.updateDiscount);
discount.delete("/:id", DiscountController.deleteDiscount);
discount.patch(
    "/:id",
    checkFolder("Discount"),
    upload.single("image"),
    DiscountController.uploadImageDiscount
  );

module.exports = discount;
