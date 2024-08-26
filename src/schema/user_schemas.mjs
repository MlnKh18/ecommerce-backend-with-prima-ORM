import Joi from "joi";
export const SignUpSchemas = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(7).required(),
})