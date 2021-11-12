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
        }
    }catch (error) {
        next(error)
    }
})

export default productsRouter
