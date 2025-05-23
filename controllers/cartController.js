const userModel = require("../models/userModels");

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// update products to user cart

const updateCart = async (req, res) => {};

// get user cart data

const getUserCart = async (req, res) => {};

module.exports = {
  addToCart,
  updateCart,
  getUserCart,
};
