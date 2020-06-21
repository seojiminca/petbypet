const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    desc: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
