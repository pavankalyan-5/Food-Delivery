import { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import './Add.css'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const Add = (props) => {
    const { url } = props

    const [image, setImage] = useState(null)
    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        category: 'Salad',
        price: ''
    
    })

    const onChangeHandler = (e) => {
        setFoodData({
            ...foodData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', foodData.name)
        formData.append('description', foodData.description)
        formData.append('category', foodData.category)
        formData.append('price', Number(foodData.price))
        formData.append('image', image)

        const response = await axios.post(`${url}api/food/add`, formData);
        if(response.data.success){
            setFoodData({
                name: '',
                description: '',
                category: 'Salad',
                price: ''
            })
            setImage(null)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }



  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={foodData.name} type="text" name='name' placeholder='Type here' required/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={foodData.description} name='description' rows="6" placeholder='Write content here' required/>
            </div>
            <div className="add-category-price">
               <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Drinks</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
               </div>
                <div className="add-price flex-col">
                 <p>Product price</p>
                 <input onChange={onChangeHandler} value={foodData.price} type="number" name='price' placeholder='$20' required/>
                </div>
            </div>
            <button type='submit' className='add-button'>Add Product</button>
        </form>
      
    </div>
  )
}

Add.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Add
