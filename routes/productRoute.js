const express = require("express");
const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} = require("../controllers/productController.js");
const upload = require("../middleware/multer.js");
const adminAuth = require("../middleware/adminAuth.js");

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove-product", adminAuth, removeProduct);
productRouter.post("/single-product", singleProduct);
productRouter.get("/list-product", listProduct);

module.exports = productRouter;
