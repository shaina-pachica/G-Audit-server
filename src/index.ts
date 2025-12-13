import express from "express"
import helmet from "helmet"
import "dotenv/config";
import corsMiddleware from "./middleware/cors";
import SequelizeDb from "./lib/db";
import { insecureRoutes, secureRoutes } from "./routes";

const PORT = process.env.PORT
const _ = SequelizeDb.getDbInstance()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(corsMiddleware)
app.use("/api/v1/", insecureRoutes, secureRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app
