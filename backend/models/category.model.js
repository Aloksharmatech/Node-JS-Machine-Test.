const db = require("../config/db");

const getCategory = (callback) => {
  db.query("select * from categories", callback);
};

const getCategoryById = (id, callback) => {
  db.query("select * from categories where CategoryId=?", [id], callback);
};

const insertCategory = (data, callback) => {
  const { CategoryName } = data;
  db.query(
    "insert into categories (CategoryName) values (?)",
    [CategoryName],
    callback
  );
};

const updateCategory = (id, data, callback) => {
  const { CategoryName } = data;
  db.query(
    "update categories set CategoryName=? where CategoryId=?",
    [CategoryName, id],
    callback
  );
};

const deleteCategory = (id, callback) => {
  db.query("delete from categories where CategoryId=?", [id], callback);
};

module.exports = {
  getCategory,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
