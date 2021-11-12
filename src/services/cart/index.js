import express from "express"
import CartModel from "./shcema.js"
import Bookmodel from "./shemabook.js"



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
      const { total, books } = await BookModel.findBookWithAuthors(mongoQuery)
  
      res.send({ links: mongoQuery.links("/books", total), pageTotal: Math.ceil(total / mongoQuery.options.limit), total, books })
    } catch (error) {
      next(error)
    }
  })


  export default cartRouter