import { loginUser, registerUser } from "./auth_service.mjs";

export const signUp = async (request, response) => {
  const { name, email, password } = request.body;
  try {
    const newUser = await registerUser(name, email, password);
    response.status(201).json({ message: "Success Full", data: newUser });
  } catch (error) {
    if (error.message === "Email already exists") {
      return response.status(400).json({ message: error.message });
    }
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await loginUser(email, password);
    response.status(200).json({ data: user});
  } catch (error) {
    if (error.message === "Invalid email") {
      return response.status(400).json({message: error.message})
    }
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
