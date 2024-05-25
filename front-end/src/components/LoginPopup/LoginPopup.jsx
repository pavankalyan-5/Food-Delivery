import { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

    const { url, setToken, token } = useContext(StoreContext)
    const [currState, setCurrState] = useState('Sign Up')
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState(null)

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const endPoint = `${url}/api/user/${currState === "Login" ? "login" : "register"}`
            const response = await axios.post(endPoint, userData)
            if(response.data.success){
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                setShowLogin(false)
                toast.success(response.data.message)
            }
            else {
                alert(response.data.message)
            }
        } catch(error) {
            const { data } = error.response
            setErrorMessage(data)
        }
    }

    useEffect(() => {
        // clear state when currState changes
        setUserData({
            name: '',
            email: '',
            password: ''
        })
        setErrorMessage(null)
    },[currState])


  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onSubmitHandler}>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState === "Sign Up" && (
                <input onChange={onChangeHandler} value={userData?.name} type="text" placeholder='Your name' name='name' required /> )
            }
            {/* <input type="text" placeholder='Your name' required />  */}
            <input type="email" name='email' onChange={onChangeHandler} value={userData?.email}  placeholder='Your email' required className={errorMessage?.type == 'email' ? "error-field"  : ''} />
            <input type="password" name='password' onChange={onChangeHandler} value={userData?.password} placeholder='Password' required className={errorMessage?.type == 'password' ? "error-field"  : ''} />
        </div>
        {errorMessage?.message && (
            <span className='error-message'>
                {errorMessage.message}
            </span>)
        }
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ?
             <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p> :
             <p>Already have an account? <span onClick={() => setCurrState("Login")} >Login here</span> </p>
        }
       
      </form>
    </div>
  )
}

export default LoginPopup
