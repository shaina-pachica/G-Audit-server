import express from "express"
import ctrlAuth from "./controllers/Auth"

export const insecureRoutes = express.Router()
insecureRoutes.use("/health", express.Router().get("/", (_, res, req) => res.send("Ok")))
insecureRoutes.use("/auth", ctrlAuth)
