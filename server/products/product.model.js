const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    desc: {
      type: String
    },
    flavour: {
      type: String
    },
    item_form: {
      type: String
    },
    age: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
