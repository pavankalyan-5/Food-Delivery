import express from 'express';
import { addToCart, removeFromCart, fetchCartData } from '../controllers/cartController.js';
import authMiddleWare from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleWare, addToCart);
cartRouter.post('/remove', authMiddleWare, removeFromCart);
cartRouter.post('/fetch', authMiddleWare, fetchCartData);

export default cartRouter;