import React from 'react'
import {Link} from 'react-router-dom'

function SideMenu () {

    // const { dispatch } = props

    return (
        <div className='sidemenu'>
            <div className='navitem'>
                <Link to="/">Home</Link>
            </div>
            <div className='navitem'>
                <Link to="/confdesp">Confirmed Despatches</Link>
            </div>
            <div className='navitem'>
                <Link to="/custwklydesps">Customer Weekly Despatches</Link>
            </div>
            {/* <div className='navitem'>
                <Link to="/invoice">DPD Invoices </Link>
            </div>    */}
            <div className='navitem'>
                <Link to="/login">Logout</Link>
            </div>   
        </div>
    )
}

export default SideMenu