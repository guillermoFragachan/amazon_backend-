import mongoose from "mongoose"

const { Schema, model } = mongoose

const cartSchema = new Schema(
  {
    // ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, enum: ["active", "paid"] },
    products: [{ asin: String, title: String, price: Number, quantity: Number }],
  },
  {
    timestamps: true,
  }
)


 
  

export default model("Cart", cartSchema)
