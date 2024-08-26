import { Router } from "express";
import { getMe, signIn, signUp } from "../modules/user/auth/auth_controller.mjs";
import { validateSignUp } from "../utils/validations.mjs";
import { authMiddleware } from "../middleware/auth_middleware.mjs";
export const authRoutes = Router();

authRoutes.post("/register", validateSignUp, signUp);
authRoutes.post("/login", signIn);
authRoutes.get('/me', authMiddleware, getMe)
