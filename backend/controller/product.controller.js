const {
  getAllProducts,
  getProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../models/product.model");
const db = require("../config/db");

const fetchAllProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  getAllProducts(page, limit, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    // Get total number of products for pagination
    db.query("SELECT COUNT(*) as total FROM products", (err2, countResult) => {
      if (err2) return res.status(500).json({ error: err2 });

      res.json({
        data: result,
        total: countResult[0].total,
        page,
        limit,
      });
    });
  });
};

const fetchProducts = (req, res) => {
  getProducts((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const fetchProductById = (req, res) => {
  const { id } = req.params;
  getProductsById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

const addProduct = (req, res) => {
  insertProduct(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "product addedd", result });
  });
};

const editProduct = (req, res) => {
  const { id } = req.params;
  updateProduct(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "product updated" });
  });
};

const removeProduct = (req, res) => {
  const { id } = req.params;
  deleteProduct(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "product deleted" });
  });
};

module.exports = {
  fetchAllProducts,
  fetchProducts,
  fetchProductById,
  addProduct,
  editProduct,
  removeProduct,
};
