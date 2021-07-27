// external imports
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const path = require("path");

// internal imports
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// init app
dotenv.config();

// db connect
connectDB();

const app = express();

// init morgan
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

// request parser
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// routing setup
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// 404 not found handler
app.use(notFound);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT || 6000, () => {
   console.log(`Example app listening at ${process.env.PORT}`);
});
