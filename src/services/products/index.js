import express from "express"
import productSchema from "./schema.js"

import ProductModel from "./schema.js"



const productsRouter = express.Router()

productsRouter.post ("/", async(req, res, next)=> {
    try{
        const newProduct = new ProductModel(req.body)
        const {_id} = await newProduct.save()
        res.status(201).send({_id})
    }catch (error) {
        next(error)
    }
})

productsRouter.get("/", async(req, res, next)=> {

    try {
        const products = await ProductModel.find()
        res.send(products)
    }catch (error) {
        next(error)
    }
})



productsRouter.get("/:productId", async(req, res, next)=> {
    try {
        const id = req.params.productId

        const product = await ProductModel.findById(id)
        if (product) {
            res.send(product)
        }else{
            res
            .status(404)
            .send({ message: `product with ${id} is not found!` })
        }
    }catch (error) {
        next(error)
    }
})

productsRouter.put("/:productId", async (req, res, next) => {
    try {
      const id = req.params.userId
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true })
  
      if (updatedProduct) {
        res.send(updatedProduct)
      } else {
        res
            .status(404)
            .send({ message: `product with ${id} is not found!` })
      }
    } catch (error) {
      next(error)
    }
  })
  
  productsRouter.delete("/:productId", async (req, res, next) => {
    try {
      const id = req.params.productId
  
      const deletedProduct = await ProductModel.findByIdAndDelete(id)
      if (deletedProduct) {
        res.status(204).send()
      } else {
        res
        .status(404)
        .send({ message: `product with ${id} is not found!` })
      }
    } catch (error) {
      next(error)
    }
  })

  productsRouter.post("/:productId/reviews", async(req,res,next)=> {
    try {
      const newReview = req.body

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { $push: { reviews: newReview } },
        { new: true }
      )

      if (updatedProduct) {
        res.send(updatedProduct)
      } else {
        next(createError(404, `Product with _id ${productId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

  // GET /products/:productId/reviews => returns all the reviews for the specified product

productsRouter.get("/:productId/reviews", async (req, res, next) => {
  console.log(req.params.productId)
  try {
      const product = await ProductModel.findById(req.params.productId)
      
      if (product) {
          res.send(blogPost.comments)
      } else {
          next(createError(404, `Blog post with id ${req.params.id} not found!`))
      }
  } catch (error) {
      next(error)
  }
})
  

export default productsRouter
