import { Router } from "express";
import { authRoutes } from "./auth_routes.mjs";
const rootRouter = Router();
rootRouter.use("/auth", authRoutes);

export default rootRouter;
