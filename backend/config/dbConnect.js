const mongoose = require("mongoose")

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI)
    console.log("database connection established");
  }catch(err) {
    throw new Error("Error connecting to Mongo");
  }
}

module.exports = dbConnect