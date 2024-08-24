"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const Schema = _mongoose2.default.Schema;

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderNote: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Beklemede', 'Hazırlanıyor', 'Tamamlandı'],
    default: 'Beklemede',
  }
});

const Order = _mongoose2.default.model("order", OrderSchema);

exports. default = Order;

