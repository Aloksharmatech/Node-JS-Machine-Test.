const {
  getCategory,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
} = require("../models/category.model");

const fetchCategory = (req, res) => {
  getCategory((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const fetchCategoryById = (req, res) => {
  const { id } = req.params;
  getCategoryById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

const addCategory = (req, res) => {
  // console.log(req.body);
  insertCategory(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "category addedd", result });
  });
};

const editCategory = (req, res) => {
  const { id } = req.params;
  updateCategory(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "category updated" });
  });
};

const removeCategory = (req, res) => {
  const { id } = req.params;
  deleteCategory(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "category deleted" });
  });
};

module.exports = {
  fetchCategory,
  fetchCategoryById,
  addCategory,
  editCategory,
  removeCategory,
};
