import express from "express";
import { PORT } from "./secret.mjs";
import cors from "cors";
import rootRouter from "./src/routes/app.routes.mjs";
import errorMiddleware from "./src/middleware/error_middleware.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Konfigurasi CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Ganti dengan URL frontend Anda
    credentials: true, // Izinkan kredensial (cookies)
  })
);

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
