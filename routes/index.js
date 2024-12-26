const express = require("express");
const router = express.Router();
const errHandler = require("../middlewares/errorHandler");
const {
  cart,
  category,
  collectionProduct,
  collectionProductItem,
  discount,
  discountUsage,
  finishing,
  material,
  order,
  orderItem,
  payment,
  product,
  productColor,
  productImage,
  productSize,
  productVariant,
  review,
  shipping,
  type,
  user,
  userProfil,
  wishlist,
} = require("./indexModules");

router.get("/", (req, res) => {
  res.send("Hey this is my API running ?");
});

router.get("/health", (req, res) => {
  res.status(200).send({ message: "API is running" });
});

router.use("/cart", cart);
router.use("/category", category);
router.use("/collectionproduct", collectionProduct);
router.use("/collectionproductitem", collectionProductItem);
router.use("/discount", discount);
router.use("/discountusage", discountUsage);
router.use("/finishing", finishing);
router.use("/material", material);
router.use("/order", order);
router.use("/orderitem", orderItem);
router.use("/payment", payment);
router.use("/product", product);
router.use("/productcolor", productColor);
router.use("/productimage", productImage);
router.use("/productsize", productSize);
router.use("/productvariant", productVariant);
router.use("/review", review);
router.use("/shipping", shipping);
router.use("/type", type);
router.use("/user", user);
router.use("/userprofil", userProfil);
router.use("/wishlist", wishlist);

router.use(errHandler);

module.exports = router;
