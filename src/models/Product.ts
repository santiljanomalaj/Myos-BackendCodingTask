import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        description: { type: String, required: true },
        picture: { type: String },
        price: { type: Number },
        quantity: { type: Number }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", ProductSchema)