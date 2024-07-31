import express from 'express';
const router = express.Router();

import Order from '../controllers/order';

router.post('/', Order.Create);
router.get('/', Order.List);
router.get('/my-orders', Order.GetMyOrders);
router.post('/update-status', Order.UpdateStatus);

export default router;
