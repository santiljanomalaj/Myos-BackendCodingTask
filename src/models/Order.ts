import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            require: true
        },
        quantity: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Order", OrderSchema)