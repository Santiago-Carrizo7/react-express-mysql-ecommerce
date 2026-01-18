import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:1234", "http://localhost:8080"];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true); // Accept the request
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
  });
