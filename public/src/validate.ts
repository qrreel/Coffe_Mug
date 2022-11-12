const Joi = require("joi");

export function validateProducts(req: Request) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().required(),
  });

  return schema.validate(req);
}
