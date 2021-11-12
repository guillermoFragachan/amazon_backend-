import mongoose from "mongoose"

const { Schema, model } = mongoose


  const reviewSchema = new mongoose.Schema(
      {
          comment: { type: String },
          rate: { type: Number, min: 1, max: 5},
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }

      },
      {
          timestamps: true
      }
  )

export default mongoose.model("Review", reviewSchema);