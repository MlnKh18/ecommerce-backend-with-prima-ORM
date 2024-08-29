import { allProduct } from "./product_repository.mjs";
import {
  createProductService,
  deleteProductService,
  patchProductService,
  putProductService,
} from "./product_service.mjs";

export const getAllProduct = async (request, response) => {
  const products = await allProduct();
  console.info(request.user);
  response.json(products);
};

export const createProduct = async (request, response) => {
  const { name, price, description } = request.body;

  try {
    const newProduct = await createProductService(name, price, description);
    response.status(201).json(newProduct);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const updatePutProduct = async (request, response) => {
  const { id } = request.params;
  const { name, price, description } = request.body;

  try {
    // Panggil fungsi layanan untuk memperbarui produk
    const updatedProduct = await putProductService(id, {
      name,
      price,
      description,
    });

    response.status(200).json(updatedProduct); // Status 200 untuk permintaan yang berhasil
  } catch (error) {
    response.status(400).json({ message: error.message }); // Status 400 untuk kesalahan klien
  }
};

export const updatePatchProduct = async (request, response) => {
  const { id } = request.params;
  try {
    // Panggil service untuk memperbarui produk dengan data yang baru
    const updatedProduct = await patchProductService(id, request.body);

    // Kirim respons dengan status 200 dan data produk yang telah diperbarui
    response.status(200).json(updatedProduct);
  } catch (error) {
    // Tangani kesalahan dan kirim respons dengan status 400 dan pesan kesalahan
    response.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (request, response) => {
  const { id } = request.params;

  try {
    // Pastikan ID dikonversi menjadi number jika diperlukan
    const deleteProducts = await deleteProductService(Number(id));
    response.status(200).json(deleteProducts);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
