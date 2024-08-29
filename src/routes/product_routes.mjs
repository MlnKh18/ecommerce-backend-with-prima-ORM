import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updatePatchProduct,
  updatePutProduct,
} from "../modules/product/product_controller.mjs";
import { authMiddleware } from "../middleware/auth_middleware.mjs";
// import { adminMiddleware } from "../middleware/admin_middleware.mjs";
export const productRoutes = Router();

productRoutes.get("/", getAllProduct);

productRoutes.post("/create", authMiddleware, createProduct);
productRoutes.put("/update/put/:id", authMiddleware, updatePutProduct);
productRoutes.patch("/update/patch/:id", authMiddleware, updatePatchProduct);
productRoutes.delete("/delete/:id", authMiddleware, deleteProduct);
