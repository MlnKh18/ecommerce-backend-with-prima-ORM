import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../secret.mjs";
import prisma from "../db/prisma.mjs";

// Middleware to check for Authorization header and verify JWT
export const authMiddleware = async (request, response, next) => {
  const token = request.cookies.auth_token; // Access the Authorization header
  console.info(request.cookies)

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const payload = jwt.verify(token, JWT_KEY);
    const findUser = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!findUser) {
      return response
        .status(401)
        .json({ message: "Access denied. User not found." });
    }

    request.user = findUser; // Attach user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return response.status(400).json({ message: "Invalid token." });
  }
};
