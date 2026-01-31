const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// Admin Middleware
const isAdmin = (req, res, next) => {
  const role = req.headers.role;
    console.log("Role from request body:", role);
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

// Add Product (Admin only)
router.post("/add", isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const newProduct = new Product({ name, price, description, category, stock });
    await newProduct.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    console.log("Error adding product", err);
    res.status(500).json({ message: "Server error while adding product" });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log("Error fetching products", err);
    res.status(500).json({ message: "Error while fetching products" });
  }
});

// Delete Product (Admin only)
router.delete("/delete/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log("Error deleting product", err);
    res.status(500).json({ message: "Server error while deleting product" });
  }
});

module.exports = router;