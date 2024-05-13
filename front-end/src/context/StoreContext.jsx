import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const { children } = props

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            return {
                ...prev,
                [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
            }
        })
    }

    const removeFromCart = (itemId) => {
        // decrease rhe count of the item in the cart
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))
    }

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find(({ _id }) => _id === itemId)
            return total + item.price * cartItems[itemId]
        }, 0)
    }

    const contextValue = {
        // Add your state and functions here
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider