import { useState } from 'react'
import './Humburger.css'
import LeftNav from '../Navbar/LeftNav'



const Humburger = ({menu, setMenu}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
        <div className={'humburger'} onClick={() => setOpen(true)}>
            <div className={`humbuger-line ${open ? 'active-humburger' : ''}`}></div>
            <div className={`humbuger-line ${open ? 'active-humburger' : ''}`}></div>
            <div className={`humbuger-line ${open ? 'active-humburger' : ''}`}></div>
        </div>
        <LeftNav menu={menu} setMenu={setMenu} open={open} setOpen={setOpen}/>
    </>

  )
}


export default Humburger
