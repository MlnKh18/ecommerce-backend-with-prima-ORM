import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../secret.mjs";
import prisma from "../db/prisma.mjs";

export const adminMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.auth_token;

    if (!token) {
      return response.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.role !== "ADMIN") {
      return response.status(403).json({ message: "Unauthorized. Admin access required." });
    }

    // Attach user info to the request object if needed later
    request.user = user;

    next(); // Lanjut ke middleware atau handler berikutnya
  } catch (error) {
    // Jika JWT tidak valid atau ada kesalahan lain
    return response.status(400).json({ message: "Invalid token." });
  }
};
