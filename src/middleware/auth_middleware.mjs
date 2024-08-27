import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../secret.mjs"; // Pastikan JWT_KEY diambil dari variabel lingkungan
import prisma from "../db/prisma.mjs";

// Middleware untuk memeriksa header Authorization dan memverifikasi JWT
export const authMiddleware = async (request, response, next) => {
  // Ambil token dari cookies
  const token = request.cookies.auth_token;
  console.info(token)

  if (!token) {
    return response.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifikasi token
    const payload = jwt.verify(token, JWT_KEY);

    // Cari pengguna berdasarkan ID dari payload
    const findUser = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!findUser) {
      return response.status(401).json({ message: "Access denied. User not found." });
    }

    // Tambahkan informasi pengguna ke objek request
    request.user = findUser;
    next(); // Lanjutkan ke middleware berikutnya atau handler route
  } catch (error) {
    // Log error di server (jangan log token di lingkungan produksi)
    console.error('Token verification error:', error.message);
    return response.status(401).json({ message: "Invalid token." });
  }
};
