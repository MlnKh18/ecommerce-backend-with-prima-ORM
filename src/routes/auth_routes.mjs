
import { Router } from "express";
import { signIn, signUp } from "../modules/user/auth/auth_controller.mjs";
export const authRoutes = Router();

authRoutes.post("/register", signUp );
authRoutes.post("/login", signIn );
