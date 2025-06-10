import React from 'react'
import logo from '../assets/LogoName.svg';
import  { NavLink } from "react-router-dom"
import  { ChevronDown, MapPin, ShoppingCart, User,  } from "lucide-react"
function Navbar() {
  return (
    <>
    <div className='flex flex-wrap justify-between '>
        <img src={logo} alt="" />
    <div>

    <NavLink to={"/"}>Home</NavLink>
    <NavLink to={"/reports"}>Reports</NavLink>
    <NavLink  to={"/appointments"}>My Appointments</NavLink>
    </div>
 

 <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Mountain view, CA, USA</span>
              <ChevronDown className="w-4 h-4" />
            </div>

    <div className='flex'>
       <User className="w-5 h-5 text-gray-600 cursor-pointer" />
         <ShoppingCart className="w-5 h-5 text-gray-600" />
  
            </div>
    </div>
    </div>



      
    </>
  )
}

export default Navbar