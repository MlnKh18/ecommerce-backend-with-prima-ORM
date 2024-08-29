import prisma from "../../db/prisma.mjs";

export const allProduct = async () => {
  return await prisma.product.findMany();
};

export const findProductByName = async (name) => {
  return await prisma.product.findFirst({
    where: { name },
  });
};
export const findProductById = async (id) => {
  return await prisma.product.findFirst({
    where: { id },
  });
};

export const createProductInDb = async (productData) => {
  return await prisma.product.create({
    data: productData,
  });
};

export const updateProduct = async (id, productData) => {
  return await prisma.product.update({
    where: { id: Number(id) }, // Pastikan ID dikonversi menjadi number
    data: productData,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id: Number(id) },
  })
}