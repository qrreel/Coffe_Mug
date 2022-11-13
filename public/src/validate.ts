const Joi = require("joi");

export function validateProducts(req: any, res: any) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req);

  return error ? res.status(400).end(error.details[0].message) : true;
}
