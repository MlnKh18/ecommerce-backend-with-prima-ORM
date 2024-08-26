import { compareSync, hashSync } from "bcrypt";
import { findUserByEmail, createUser } from "./auth_repository.mjs";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../../../secret.mjs";
import { BadRequestException } from "../../../exections/bad-request.mjs";
import { ErrorCode } from "../../../exections/root.mjs";

export const registerUser = async (name, email, password) => {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(
        "Email already exists",
        400,
        ErrorCode.USER_ALREADY_EXISTS
      );
    }

    const hashedPassword = hashSync(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw new Error(`Error registering user: ${error}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new BadRequestException(
        "Email is incorrect",
        400,
        ErrorCode.USER_NOT_FOUND
      );
    }

    const isPasswordValid = compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        "Password is incorrect",
        400,
        ErrorCode.USER_NOT_FOUND
      );
    }

    const tokenJwt = jwt.sign({ id: existingUser.id }, JWT_KEY);

    return { message: "Login successful", user: existingUser, token: tokenJwt};
  } catch (error) {
    throw new Error(`Error logging in user: ${error.message}`);
  }
};
