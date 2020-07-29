import React from 'react'
import Logo from  '../_images/Logo-MWF.jpg'
import { Link } from 'react-router-dom'
import {isLoggedIn} from '../_helpers/authHelper'

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
          <Link className='headerlink' to="/">Home</Link>
          <Link className='headerlink' to="/orphaninvoices">Orphan Invoices</Link>
          <Link className='headerlink' to="/multilineinvoices">Multi-line Invoices</Link>
          <Link className='headerlink' to="/confdesp">Confirmed Despatches</Link>
          <Link className='headerlink' to="/custwklydesps">Customer Weekly Despatches</Link>
          {/* {isLoggedIn() && <Link className='headerlink' to="/login">Logout</Link> } */}
        </div>   

      </div>
    )
}

export default Header