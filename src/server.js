import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "../src/services/users/index.js"




const server = express()

server.use(cors())
server.use(express.json())


// **************** ENDPOINTS ****************
server.use("/user", userRouter)
const port = 3001


// server.use("/author", authorsRouter)
// server.use("/blogspot", blogspotRouter)


// mongoose.connect(process.env.URL)

// mongoose.connection.on("connected", () => {
//   console.log("Mongo Connected!")

server.listen(port, () => {
    console.table(listEndpoints(server))

    console.log(`Server running on port ${port}`)
  })
// })