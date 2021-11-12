import mongoose from "mongoose"

const { Schema, model } = mongoose

const bookSchema = new Schema(
    {
      name: { type: String, required: true },
      title: { type: String, required: true },
    },
    { timestamps: true }
  )

  export default model("Book", bookSchema)
