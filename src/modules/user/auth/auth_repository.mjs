import prisma from "../../../db/prisma.mjs";

export const findUserByEmail = async (email) => {
  return prisma.user.findFirst({
    where: { email },
  });
};

export const createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};