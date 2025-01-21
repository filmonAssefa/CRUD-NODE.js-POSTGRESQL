import Joi from "joi";

export const userSchema = {
  create: Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have at least 2 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(255).messages({
      "string.min": "Name should have at least 2 characters",
    }),
    email: Joi.string().email().messages({
      "string.email": "Please provide a valid email",
    }),
  }),

  id: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
  }),
};
