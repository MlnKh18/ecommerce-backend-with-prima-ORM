import { SignUpSchemas } from "../schema/user_schemas.mjs";


export const validateSignUp = (req, res, next) => {
  const { error } = SignUpSchemas.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details.map(x => x.message).join(', ')}` });
  }
  next();
};