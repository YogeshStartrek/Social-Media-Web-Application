import React from 'react'
import Logo from '../../img/logo.png'
import './LogoSearch.css'
import { FaSearchengin } from "react-icons/fa";
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        <img src={Logo} />
        <div className="search">
            <input type="text" placeholder={'#Explore'} />
            <div className="s-icon">
             <FaSearchengin />
            </div>
        </div>
    </div>
  )
}

export default LogoSearch