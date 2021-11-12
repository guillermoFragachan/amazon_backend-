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
  
  productsRouter.delete("/:productrId", async (req, res, next) => {
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

  productsRouter.post("/:productId/reviews", async (req, res, next) => {

    try {
        const id = req.params.productId
        const newReview = req.body
        const product = await ProductModel.findById(id)
        if (product) {
            product.reviews.push(newReview)
            const updatedProduct = await product.save()
            res.send(updatedProduct)
        } else {
            res
            .status(404)
            .send({ message: `product with ${id} is not found!` })
        }
    } catch (error) {
        next(error)
    }
}
  )

  productsRouter.get("/:productId/reviews", async (req, res, next) => {
    try {
        const id = req.params.productId
        const product = await ProductModel.findById(id)
        if (product) {
            res.send(product.reviews)
        } else {
            res
            .status(404)
            .send({ message: `product with ${id} is not found!` })
        }
    } catch (error) {
        next(error)
    }
}
  
  
  )

  productsRouter.delete("/:productId/reviews/:reviewId", async (req, res, next) => {
    try {
        const id = req.params.productId
        const reviewId = req.params.reviewId
        const product = await ProductModel.findById(id)

        if (product) {
            const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId)
            if (reviewIndex !== -1) {
                product.reviews.splice(reviewIndex, 1)
                const updatedProduct = await product.save()
                res.send(updatedProduct)
            } else {
                res
                .status(404)
                .send({ message: `review with ${reviewId} is not found!` })
            }
        } else {
            res
            .status(404)
            .send({ message: `product with ${id} is not found!` })
        }
    } catch (error) {
        next(error)
    }
  })

  productsRouter.put("/:productId/reviews/:reviewId", async (req, res, next) => {
    try {
        const id = req.params.productId
        const reviewId = req.params.reviewId
        const updatedReview = req.body
        const product = await ProductModel.findById(id)
        if (product) {
            const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId)
            if (reviewIndex !== -1) {
                product.reviews[reviewIndex] = updatedReview
                const updatedProduct = await product.save()
                res.send(updatedProduct)
            } else {
                res
                .status(404)
                .send({ message: `review with ${reviewId} is not found!` })
            }
        } else {
            res
            .status(404)
            .send({ message: `product with ${id} is not found!` })
        }
    } catch (error) {
        next(error)
    }
  })


 /*  productsRouter.post("/:productId/reviews", async(req,res,next)=> {
      try {
          const 
      }
  }) */
  

export default productsRouter
