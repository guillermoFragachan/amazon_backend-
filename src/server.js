import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import cartRouter from "./services/cart/index.js"
import productsRouter from "./services/products/index.js"
import userRouter from "../src/services/users/index.js"

import { notFoundHandler, badRequestHandler, genericErrorHandler } from "./errorHandlers.js"


dotenv.config()



const server = express()

server.use(cors())
server.use(express.json())


// **************** ENDPOINTS ****************

const port = 3001

server.use('/cart', cartRouter)
server.use('/product', productsRouter)
server.use('/user', userRouter)


// ERROR HANDLERS 

server.use(notFoundHandler)
server.use(badRequestHandler)
server.use(genericErrorHandler)

mongoose.connect(process.env.URL2)

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected!")

server.listen(port, () => {
    console.table(listEndpoints(server))

    console.log(`Server running on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})