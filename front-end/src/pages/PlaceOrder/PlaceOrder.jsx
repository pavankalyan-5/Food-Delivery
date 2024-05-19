import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    const orderItems = []
    food_list.forEach(item => {
      if(cartItems[item._id]){
        const itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push({
          ...itemInfo
        })
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }

    const response = await axios.post(`${url}/api/order/place-order`, orderData, {
      headers: {
        token
      }
    })

    if(response.data.success){
      const { url } = response.data.data
      window.location.replace(url)
    } else {
      alert('Failed to place order')
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      alert('Please login to place order')
      navigate('/cart')
    } else if(getTotalCartAmount() === 0){
      alert('Add items to cart to place order')
      navigate('/cart')
    }
  },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name'/>
        </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
          </div>
          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2.00}</b>
              </div>
            </div>
            <button type='submit' >Proceed to payment</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder