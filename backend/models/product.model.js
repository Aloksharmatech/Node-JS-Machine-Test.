const db = require("../config/db");

const getAllProducts = (page = 1, limit = 10, callback) => {
  const offset = (page - 1) * limit;
  db.query(
    "SELECT * FROM products LIMIT ? OFFSET ?",
    [limit, offset],
    callback
  );
};

const getProducts = (callback) => {
  db.query("select * from products", callback);
};

const getProductsById = (id, callback) => {
  db.query("select * from products where  ProductId=?", [id], callback);
};

const insertProduct = (data, callback) => {
  const { ProductName, CategoryId, Price } = data;
  db.query(
    "insert into products (ProductName,CategoryId,Price) values (?,?,?)",
    [ProductName, CategoryId, Price],
    callback
  );
};

const updateProduct = (id, data, callback) => {
  const { ProductName, CategoryId, Price } = data;
  db.query(
    "update products set ProductName = ? , CategoryId=?,Price=? where  ProductId=?",
    [ProductName, CategoryId, Price, id],
    callback
  );
};

const deleteProduct = (id, callback) => {
  db.query("delete from products where  ProductId=?", [id], callback);
};

module.exports = {
  getAllProducts,
  getProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
