import express from "express"
import ctrlAuth from "./controllers/Auth"
import ctrlEmp from "./controllers/Employee"
import ctrlTransact from "./controllers/Transaction"
import { authorize } from "./middleware/authorize"

export const insecureRoutes = express.Router()
export const secureRoutes = express.Router()

//secureRoutes.use(authorize)
insecureRoutes.use("/health", express.Router().get("/", (_, res, req) => res.send("Ok")))
insecureRoutes.use("/auth", ctrlAuth)
secureRoutes.use("/employees", ctrlEmp)
