const express = require("express");
const router = express.Router();
const {
  fetchAllProducts,
  fetchProducts,
  fetchProductById,
  addProduct,
  editProduct,
  removeProduct,
} = require("../controller/product.controller");

router.get("/all", fetchAllProducts);
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

module.exports = router;
