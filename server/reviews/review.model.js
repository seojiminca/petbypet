const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {Schema} = mongoose;

const reviewSchema = new Schema(
    {
        rate: {
            type: Number,
            required: true,
        },
        comment: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        cat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cat",
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("review", reviewSchema);
