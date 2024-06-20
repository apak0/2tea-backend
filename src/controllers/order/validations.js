import Joi from 'joi';
const itemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().required()
});

const itemsSchema = Joi.array().items(itemSchema).required();

const OrderSchema = Joi.object({
  address: Joi.string().required(),
  fullName: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  items: itemsSchema,
});

export default OrderSchema;
