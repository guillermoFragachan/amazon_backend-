import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"




dotenv.config()


const server = express()

server.use(cors())
server.use(express.json())


// **************** ENDPOINTS ****************

const port = 3001







mongoose.connect(process.env.URL)

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