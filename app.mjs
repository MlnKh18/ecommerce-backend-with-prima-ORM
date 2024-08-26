import express from "express";
const app = express();
import { PORT } from "./secret.mjs";
import rootRouter from "./src/routes/app.routes.mjs";
import errorMiddleware from "./src/middleware/error_middleware.mjs";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(cookieParser())

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/api", rootRouter);
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
