const express = require("express");
const router = express.Router();
const {
  fetchCategory,
  fetchCategoryById,
  addCategory,
  editCategory,
  removeCategory,
} = require("../controller/category.controller");

router.get("/", fetchCategory);
router.get("/:id", fetchCategoryById);
router.post("/", addCategory);
router.put("/:id", editCategory);
router.delete("/:id", removeCategory);

module.exports = router;
