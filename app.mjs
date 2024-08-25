import express from "express";
const app = express();
import { PORT } from "./secret.mjs";
import rootRouter from "./src/routes/app.routes.mjs";
app.use(express.json());
app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
