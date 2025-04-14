const { v2: cloudinary } = require("cloudinary");
const ProductModel = require("../models/productModels");
const mongoose = require("mongoose");

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      bestSeller,
      category,
      subCategory,
      date,
      image,
      size,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      bestSeller: bestSeller === "true",
      size: JSON.parse(size),
      date: Date.now(),
      image: imageUrl,
      category,
      subCategory,
    };
    const product = await ProductModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Failed to add product" });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await ProductModel.find().lean(); // thêm .lean() để giảm overhead
    res.json({ success: true, products });
  } catch (error) {
    console.error("List Product Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to list products" });
  }
};

//function for remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    // Kiểm tra id có hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    // Tìm và xóa sản phẩm theo id
    const product = await ProductModel.findByIdAndDelete(id).lean();

    // Nếu không tìm thấy sản phẩm
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product Removed",
    });
  } catch (error) {
    console.error("Remove Product Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
    });
  }
};

//function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await ProductModel.findById(productId).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({ success: true, product });
  } catch (error) {
    console.error("Single Product Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to find single product",
    });
  }
};

module.exports = { addProduct, listProduct, removeProduct, singleProduct };
