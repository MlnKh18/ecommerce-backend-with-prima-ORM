import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
export const PORT = process.env.PORT || 3000;
export const JWT_KEY = process.env.JWT_KEY;
