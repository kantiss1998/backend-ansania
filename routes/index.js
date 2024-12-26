const express = require("express");
const router = express.Router();
const errHandler = require("../middlewares/errorHandler");
const user = require("./user");
const userProfil = require("./userProfile");
const category = require("./category");
const product = require("./product");
const productcolor = require("./productColor");
const productsize = require("./productSize");

router.get("/", (req, res) => {
  res.send("Hey this is my API running ?");
});

router.get("/health", (req, res) => {
  res.status(200).send({ message: "API is running" });
});

router.use("/cart", user);
router.use("/category", user);
router.use("/collectionproduct", user);
router.use("/collectionproductitem", user);
router.use("/discount", user);
router.use("/discountusage", user);
router.use("/finishing", user);
router.use("/material", user);
router.use("/order", user);
router.use("/orderitem", user);
router.use("/payment", user);
router.use("/product", user);
router.use("/productcolor", user);
router.use("/productimage", user);
router.use("/productsize", user);
router.use("/productvariant", user);
router.use("/review", user);
router.use("/shipping", user);
router.use("/type", user);
router.use("/user", user);
router.use("/userprofil", userProfil);
router.use("/wishlist", user);

router.use(errHandler);

module.exports = router;
