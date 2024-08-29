import {
  createProductInDb,
  deleteProduct,
  findProductById,
  findProductByName,
  updateProduct,
} from "./product_repository.mjs";

export const createProductService = async (name, price, description) => {
  const existingProduct = await findProductByName(name);
  if (existingProduct) {
    throw new Error("Product already exists");
  }

  const productData = { name, price, description };
  return await createProductInDb(productData);
};

export const putProductService = async (id, { name, price, description }) => {
  try {
    // Pastikan ID dikonversi menjadi number jika diperlukan
    const product = await findProductById(Number(id));

    if (!product) {
      throw new Error("Product not found");
    }

    // Memperbarui produk
    const updatedProduct = await updateProduct(Number(id), {
      name,
      price,
      description,
    });

    return updatedProduct;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

export const patchProductService = async (id, productBody) => {
  try {
    // Temukan produk berdasarkan ID
    const product = await findProductById(Number(id));

    if (!product) {
      throw new Error("Product not found");
    }

    // Perbarui produk dengan data yang baru
    const updatedProduct = await updateProduct(id, productBody);

    return updatedProduct;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

export const deleteProductService = async (id) => {
  try {
    const product = await findProductById(Number(id));
    if (!product) {
      throw new Error("Product not found");
    }
    await deleteProduct(Number(id));
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};
