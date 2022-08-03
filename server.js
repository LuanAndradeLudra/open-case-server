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
const weaponRoutes = require("./server/routes/weapon");
app.use("/weapon", weaponRoutes);

app.get("/", (req, res) => res.send("Hello"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
