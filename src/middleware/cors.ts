import cors from "cors";

const corsMiddleware = cors({
  origin: [
    'http://localhost'
  ],
  credentials: true
})

export default corsMiddleware
