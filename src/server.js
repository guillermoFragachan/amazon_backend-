import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./services/auth/index.js"
import cartRouter from "./services/cart/index.js";
import productsRouter from "./services/products/index.js";
import usersRouter from "../src/services/users/index.js";

dotenv.config();

const server = express();


server.use(cors());
server.use(express.json());

// **************** ENDPOINTS ****************
server.use("/cart", cartRouter);
server.use("/product", productsRouter);
server.use("/auth/", authRouter);
server.use("/users/", usersRouter);

// server.use("/users", userRouter);

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.URL2);
  console.log("❤ DB is running succesfully")
}

console.table(listEndpoints(server));
const port = 3001;

// ERROR HANDLERS 

// server.use(notFoundHandler)
// server.use(badRequestHandler)
// server.use(genericErrorHandler)
server.listen(port, () => {
  console.log(`😎 Server is running on port ${port}`);
});

server.on("error", (err) => {
  console.log(err);
});
