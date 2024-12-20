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

router.use('/user', user)
router.use('/userprofil', userProfil)
router.use('/category', category)
router.use('/product', product)
router.use('/productcolor', productcolor)
router.use('/productsize', productsize)

router.use(errHandler)

module.exports = router;
