const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);
