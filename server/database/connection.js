const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected:${con.connection.host}`);
  } catch (err) {
    console.log(err);
    console.log("Database error");
    process.exit(1);
  }
};

module.exports = connectDB;
