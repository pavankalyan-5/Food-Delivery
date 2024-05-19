import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place order
const placeOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5174";
    const { userId, amount, items, address } = req.body;
    try{
        const newOrder = new orderModel({
            userId,
            items,
            amount: Number(amount),
            address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map(item => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100 * 80,
                },
                quantity: item.quantity,
            };
        });

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge",
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });

        return res.status(200).json({
            success: true,
            data: session,
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try{
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Payment successful",
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.status(200).json({
                success: false,
                message: "Payment failed",
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export const userOrders = async (req, res) => {
    const userId = req.body.userId;
    try{
        const orders = await orderModel.find({ userId });
        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

// get orders for admin
export const allOrders = async (req, res) => {
    try{
        const orders = await orderModel.find();
        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

// api for updating order status
export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try{
        await orderModel.findByIdAndUpdate
        (orderId, { status });
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export default placeOrder;