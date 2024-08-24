"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);
const itemSchema = _joi2.default.object({
  title: _joi2.default.string().required(),
  quantity: _joi2.default.number().integer().required()
});

const itemsSchema = _joi2.default.array().items(itemSchema).required();

const OrderSchema = _joi2.default.object({
  address: _joi2.default.string().required(),
  fullName: _joi2.default.string().required(),
  phoneNumber: _joi2.default.number().required(),
  items: itemsSchema,
  orderNote:_joi2.default.string()
});

exports. default = OrderSchema;
