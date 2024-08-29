import { Router } from "express";
import { authRoutes } from "./auth_routes.mjs";
import { productRoutes } from "./product_routes.mjs";
const rootRouter = Router();
rootRouter.use("/auth", authRoutes);
rootRouter.use("/product", productRoutes);

export default rootRouter;
