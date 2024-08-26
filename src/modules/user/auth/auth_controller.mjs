import { BadRequestException } from "../../../exections/bad-request.mjs";
import { loginUser, registerUser } from "./auth_service.mjs";

export const signUp = async (request, response) => {
  const { name, email, password } = request.body;
  try {
    const newUser = await registerUser(name, email, password);
    response
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return response
        .status(error.statusCode)
        .json({ message: error.message, errorCode: error.errorCode });
    }
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    const { user, token } = await loginUser(email, password);
    response.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000 * 60 * 2,
    });
    response.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return response
        .status(error.statusCode)
        .json({ message: error.message, errorCode: error.errorCode });
    }
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (request, response) => {
  try {
    const user = request.user;
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json({ message: "Success", data: user });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
