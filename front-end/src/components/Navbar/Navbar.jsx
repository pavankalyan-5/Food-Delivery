import './Navbar.css'
import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import Humburger from '../Humburger/Humburger'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState('home')
    const {getTotalCartAmount, setToken, token } = useContext(StoreContext)
    const navigate = useNavigate()

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
        toast.success('Loggedout successfully!')
    }
  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="" className="logo" /> </Link>
      <Humburger setMenu={setMenu} menu={menu}/>
      <div className="navbar-right">
          {/* <img src={assets.search_icon} alt="" /> */}
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="" />
            </Link>
              <div className={getTotalCartAmount() > 0 ? "dot": ""}></div>
          </div>
          {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button>
            : <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logoutHandler} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div>
          }

      </div>
    </div>
  )
}

export default Navbar
