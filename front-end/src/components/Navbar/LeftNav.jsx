import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react';
const LeftNav = ({setMenu, menu, open, setOpen}) => {
  
    const [size, setSize] = useState(window.innerWidth)
    useEffect(()=>{
        if(size > 768){
            setOpen(false)
        }
        window.addEventListener("resize", updateWidth);        
        //It is important to remove EventListener attached on window.   
        return () => window.removeEventListener("resize", updateWidth);
    },[size])

    const updateWidth = () => {
        setSize(window.innerWidth)
    }

    const handleOnClick = (e) => {
        setMenu(e.target.name)
        setOpen(false)
    }

  return (
    <div className='left-nav'>
        {open && (
                <div className='close-btn' onClick={()=> setOpen(false)}>
                    X
                </div>
            )
        }
        <ul className={!open ? "navbar-menu" : "open-left-nav"}>
            <Link name="home" to='/' onClick={handleOnClick} className={menu === "home" ? "active": ""} >home</Link>
            <a name="menu" href='#explore-menu' onClick={handleOnClick} className={menu === "menu" ? "active": ""}>menu</a>
            <a name="mobile-app" href='#app-download' onClick={handleOnClick} className={menu === "mobile-app" ? "active": ""}>mobile-app</a>
            <a name="contact-us" href='#footer' onClick={handleOnClick} className={menu === "contact-us" ? "active": ""}>contact-us</a>
        </ul>
    </div>
  )
}

export default LeftNav
