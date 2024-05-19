import express from 'express';
import placeOrder, { allOrders, updateOrderStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleWare from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place-order', authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/myorders', authMiddleWare, userOrders);
orderRouter.get('/allorders', allOrders);
orderRouter.post('/status', updateOrderStatus);

export default orderRouter;