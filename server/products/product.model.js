const mongoose = require("mongoose");

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
