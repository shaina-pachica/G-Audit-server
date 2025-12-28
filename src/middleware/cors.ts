import cors from "cors";

const corsMiddleware = cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.123.34:5173'
  ],
  credentials: true
})

export default corsMiddleware
