const { v2: cloudinary } = require("cloudinary");
const Product = require("../models/productModels");

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
    console.log(productData);
    const product = await Product(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to add product" });
  }
};

// function for list product
const listProduct = async (req, res) => {};

//function for remove product
const removeProduct = async (req, res) => {};

//function for single product info
const singleProduct = async (req, res) => {};

module.exports = { addProduct, listProduct, removeProduct, singleProduct };
