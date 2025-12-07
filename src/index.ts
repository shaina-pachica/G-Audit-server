import express from "express"
import helmet from "helmet"
import "dotenv/config";

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(helmet())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app
