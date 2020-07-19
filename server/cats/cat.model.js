const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const catSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        DOB: {
            type: Date,
            required: true,
        },
        species: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.OjbectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("cat", catSchema);
