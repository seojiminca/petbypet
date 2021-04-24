const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        hashed: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
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

module.exports = mongoose.model("user", userSchema);
