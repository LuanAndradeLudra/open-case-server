require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./server/database/connection");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(express.static("public"));

// MongoDB
connectDb();

//Cors
app.use(cors());

// Morgan
app.use(morgan("tiny"));

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const authRoutes = require("./server/routes/auth");
app.use("/auth", authRoutes);
const weaponRoutes = require("./server/routes/weapon");
app.use("/weapon", weaponRoutes);
const categoriesRoutes = require("./server/routes/categories");
app.use("/categories", categoriesRoutes);
const boxRoutes = require("./server/routes/box");
app.use("/box", boxRoutes);

app.get("/", (req, res) => res.send("Hello"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
