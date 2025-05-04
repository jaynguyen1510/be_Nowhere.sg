const express = require("express");
const {
  addToCart,
  updateCart,
  getUserCart,
} = require("../controllers/cartController.js");
const authUser = require("../middleware/auth.js");

const cartRouter = express.Router();

// Lấy giỏ hàng của người dùng
cartRouter.get("/get", authUser, getUserCart);

// Thêm sản phẩm vào giỏ hàng
cartRouter.post("/add", authUser, addToCart);

// Cập nhật giỏ hàng
cartRouter.put("/update", authUser, updateCart);

module.exports = cartRouter;
