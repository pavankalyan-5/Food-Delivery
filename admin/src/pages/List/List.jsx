import './List.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const List = (props) => {
    const { url } = props
    const [list, setList] = useState([])
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}api/food/all`)
            console.log(response.data)
            if(response.data.success){
                setList(response.data.data)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to fetch data')
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await axios.post(`${url}api/food/delete/${id}`)
            if(response.data.success){
                toast.success(response.data.message)
                await fetchList()
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to delete item')
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
        </div>
        {list.map((item, index) => {
            return (
                <div key={index} className="list-table-format">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={()=>deleteItem(item._id)} className='cursor'>X</p>
                </div>
            )
        })}
    </div>
  )
}

List.propTypes = {
    url: PropTypes.string.isRequired
}

export default List
