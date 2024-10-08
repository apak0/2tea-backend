import User from "../../models/user";
import Order from "../../models/order";
import Boom from "boom";
import OrderSchema from "./validations";

const Create = async (req, res, next) => {
  const input = req.body;
  console.log(input)
  input.items = input.items.map(({ title, quantity }) => ({ title, quantity }));
  console.log("input:", input.items);
  const { error } = OrderSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  const { user_id } = req.payload;

  try {
    const order = new Order({
      user: user_id,
      fullName: input.fullName,
      phoneNumber: input.phoneNumber,
      address: input.address,
      items: input.items,
      orderNote: input.orderNote
    });

    const savedData = await order.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const List = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password -__v")
      .populate("items");

    res.json(orders);
    
  } catch (e) {
    next(e);
  }
};

const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    const orders = await Order.findById(user_id).populate("purchases.item");

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const UpdateStatus = async (req, res, next) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return next(Boom.notFound("Order not found"));
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  List,
  GetMyOrders,
  UpdateStatus,
};
