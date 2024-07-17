import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
  }
});

const Order = mongoose.model("order", OrderSchema);

export default Order;

