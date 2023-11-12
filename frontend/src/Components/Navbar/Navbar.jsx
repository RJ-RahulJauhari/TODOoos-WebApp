import React from 'react'
import './Navbar.scss'
// import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo clickable flex1'>
        <h1>TODOoos...</h1>
      </div>
      {/* <div className='navigation-tabs flex3'>
        <Link className="tab hoverable scaleUp" to="/"><p>Home</p></Link>
        <Link className="tab hoverable scaleUp" to="/analytics"><p>Analytics</p></Link>
      </div> */}
    </div>
  )
}

export default Navbar
