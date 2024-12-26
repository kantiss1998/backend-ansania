const express = require("express");
const ShippingController = require("../controllers/shipping");

const shipping = express.Router();

shipping.get("/", ShippingController.getAllShipping);
shipping.post("/", ShippingController.createShipping);
shipping.put("/:id", ShippingController.updateShippingStatus);
shipping.delete("/:id", ShippingController.deleteShipping);
shipping.get("/:id", ShippingController.getShippingById);

module.exports = shipping;
