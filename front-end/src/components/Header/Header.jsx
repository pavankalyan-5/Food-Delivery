import './Header.css'
function Header() {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes with the finest ingredients and culinary expertise. 
            Our mission is to satisy your carvings and elevate your dining experience, one delicious meal at a time.</p>
        {/* <button>View Menu</button> */}
        <a href='#explore-menu'>View Menu</a>
      </div>
    </div>
  )
}

export default Header
