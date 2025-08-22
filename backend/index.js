const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const categoryRouter = require("./routes/category.routes");
const productRouter = require("./routes/product.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cat", categoryRouter);
app.use("/api/product", productRouter);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
