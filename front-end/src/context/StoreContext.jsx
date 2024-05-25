import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const { children } = props

    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000'
    const [token, setToken] = useState(null)
    const [food_list, setFoodList] = useState([])

    useEffect(() => {
        async function fetchData() {
            await fetchFoodList()
            const token = localStorage.getItem('token')
            if(token){
                setToken(token)
                await loadCartData(token)
            }
        }
        fetchData()
    }, [])

    const fetchFoodList = async () => {
        try {
            const response = await axios(`${url}/api/food/all`)
            const data = response.data
            setFoodList(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            return {
                ...prev,
                [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
            }
        })

       if(token){
            await axios.post(`${url}/api/cart/add`, {itemId}, {
                headers: {
                    token
                }
            })
       }

    }

    const removeFromCart = async (itemId) => {
        // decrease rhe count of the item in the cart
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))

        if(token){
            await axios.post(`${url}/api/cart/remove`, {itemId}, {
                headers: {
                    token
                }
            })
        }
    }

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find(({ _id }) => _id === itemId)
            return total + item.price * cartItems[itemId]
        }, 0)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/fetch`, {}, {
            headers: {
                token
            }
        })
        if(response.data.success){
            setCartItems(response.data.data)
        }
    }

    const contextValue = {
        // Add your state and functions here
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider