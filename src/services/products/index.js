import express from "express"
import producSchema from "./schema.js"

const productsRouter = express.Router()

productsRouter.post ("/", async(req, res, next)=> {
    try{
        const newProduct = new productModel(req.body)
        const {_id} = await newProduct.save()
        res.status(201).send({_id})
    }catch (error) {
        next(error)
    }
})

productsRouter.get("/", async(req, res, next)=> {

    try {
        const products = await productModel.find()
        res.send(products)
    }catch (error) {
        next(error)
    }
})

productsRouter