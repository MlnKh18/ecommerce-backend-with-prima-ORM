import { compareSync, hashSync } from "bcrypt";
import { findUserByEmail, createUser } from "./auth_repository.mjs";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../../../secret.mjs";

export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const hashedPassword = hashSync(password, 10);
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (email, password) => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new Error("Invalid email");
  }

  const isPasswordValid = compareSync(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect password");
  }

  const tokenJwt = jwt.sign({ id: existingUser.id }, JWT_KEY);
  return { message: "Success Full", user: existingUser, token: tokenJwt };
};
