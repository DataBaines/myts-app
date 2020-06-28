import React from 'react'
import Logo from  '../_images/Logo-MWF.jpg'
import { Link } from 'react-router-dom'

function Header () {

    const linkStyle = {
      margin: '15px',
    }

    return (
      <div className='header'>
        <div id ="headerlogo" >
          <img src={Logo} alt='website logo'/>
        </div>
        <p id='rbtitle'>Developed by Ralph Baines.</p>
        <div className='navitem'>
          <Link className='link' to="/">Home</Link>
          <Link className='link' to="/confdesp">Confirmed Despatches</Link>
          <Link className='link' to="/custwklydesps">Customer Weekly Despatches</Link>
          <Link className='link' to="/login">Logout</Link>
        </div>   

      </div>
    )
}

export default Header