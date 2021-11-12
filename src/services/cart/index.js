import express from "express"
import CartModel from "./shcema.js"
import BookModel from "./shemabook.js"

import q2m from "query-to-mongo"




/*************PRODUCT GET POST***************/

const cartRouter = express.Router()


cartRouter.post("/p", async (req, res, next) => {
    try {
      const newBook = new BookModel(req.body)
      const { _id } = await newBook.save()
      res.status(201).send({ _id })
    } catch (error) {
      next(error)
    }
  })
  
  cartRouter.get("/p", async (req, res, next) => {
    try {
      const mongoQuery = q2m(req.query)
      console.log(mongoQuery)
      const { total, books } = await Bookmodel.findBookWithAuthors(mongoQuery)
  
      res.send({ links: mongoQuery.links("/books", total), pageTotal: Math.ceil(total / mongoQuery.options.limit), total, books })
    } catch (error) {
      next(error)
    }
  })



  /************CART CRUD*******************/

  cartRouter.post("/", async (req, res, next) => {
    
      // We are going to receive bookId and quantity in req.body
  
      // 1. Find book in books collection by bookId
  
      const { books } = req.body
  
      const purchasedBook = await BookModel.findById(books)
  
      if (purchasedBook) {
        // 2. Is the product already in the active cart of the specified ownerId?
  
        const isBookThere = await CartModel.findOne({"books": purchasedBook._id })
  
        
          // 4. If product is not there --> add it to cart
          const bookToInsert = { ...purchasedBook.toObject() }
  
          const cart = await CartModel.findOneAndUpdate(
            { status: "active" },
            {
              $push: { products: bookToInsert },
            },
            {
              new: true,
              upsert: true,
            }
          )
  
          res.send(cart)
        
    }
   
  })

    cartRouter.get("/", async (req, res, next) => {

        // 1. Find cart by ownerId
        const cart = await CartModel.find({ status: "active" })
  
        if (cart) {
          res.send(cart)
        } else {
          res.send({})
        }
      
    })

    cartRouter.put("/", async (req, res, next) => {
        try {
            const { _id } = req.body
            const updatedCart = await CartModel.findOneAndUpdate(
            { _id },
            {
                $set: { status: "paid" },
            },
            { new: true }
            )
            res.send(updatedCart)
        } catch (error) {
            next(error)
        }
    })
  

  export default cartRouter