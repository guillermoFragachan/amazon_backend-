import express from "express"
import CartModel from "./shcema.js"
// import ProductModel from "./shemabook.js"
import ProductModel from "../products/schema.js"



import q2m from "query-to-mongo"




// /*************PRODUCT GET POST***************/

const cartRouter = express.Router()


// cartRouter.post("/p", async (req, res, next) => {
 
//       const newBook = new ProductModel(req.body)
//       const { _id } = await newBook.save()
//       res.status(201).send({ _id })
    
//   })
  
//   cartRouter.get("/p", async (req, res, next) => {
//     try {
//       const mongoQuery = q2m(req.query)
//       console.log(mongoQuery)
//       const { total, products } = await ProductModel.findBookWithAuthors(mongoQuery)
  
//       res.send({ links: mongoQuery.links("/products", total), pageTotal: Math.ceil(total / mongoQuery.options.limit), total, products })
//     } catch (error) {
//       next(error)
//     }
//   })



  /************CART CRUD*******************/

  cartRouter.post("/", async (req, res, next) => {
    
      // We are going to receive bookId and quantity in req.body
  
      // 1. Find book in products collection by bookId
  
      const { products } = req.body

      

     

  
      const purchasedBook = await ProductModel.findById(products)
      const products123 = await ProductModel.find()

      console.log(products123)
  
      if (purchasedBook) {
        // 2. Is the product already in the active cart of the specified ownerId?
  
        const isBookThere = await CartModel.findOne({"products": purchasedBook._id })
  
        
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