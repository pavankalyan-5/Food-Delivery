import userModel from "../models/userModel.js";

// add items to cart
export const addToCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const user = await userModel.findById(userId)
    const cartData = await user.cartData;
    cartData[itemId] = (!cartData[itemId]) ? 1 : cartData[itemId] + 1;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({
      success: true,
      message: "Item added to cart",
    });
    }
    catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
}

// remove items from cart
export const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const user = await userModel.findById(userId);
    const cartData = await user.cartData;

    if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
    }
    catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
}

// Fetch user cart data
export const fetchCartData = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel
    .findById(userId);
    const cartData = await user.cartData;
    res.status(200).json({
        success: true,
        data: cartData,
        });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
}