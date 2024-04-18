const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("error in DB connection", err));
}

module.exports = dbConnect ;