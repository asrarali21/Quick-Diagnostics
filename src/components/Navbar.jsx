import React from 'react'
import logo from '../assets/LogoName.svg';
import  { NavLink } from "react-router-dom"
import  { ChevronDown, MapPin, ShoppingCart, User,  } from "lucide-react"

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E5E5E5]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 h-14">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2 min-w-[220px]">
          <img src={logo} alt="" className="w-8 h-8" />
          <span className="text-lg font-medium" style={{ color: '#7C5CFC' }}>Zemoso Diagnostics</span>
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink to={"/"} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Home</NavLink>
          <NavLink to={"/reports"} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Reports</NavLink>
          <NavLink to={"/appointments"} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">My Appointments</NavLink>
        </div>
        {/* Location and Icons */}
        <div className="flex items-center space-x-6 min-w-[260px] justify-end">
          <div className="flex items-center border-b border-gray-300 pr-2 space-x-1 text-gray-600">
            <MapPin className="w-5 h-5" color="#7C5CFC" />
            <span className="text-base">Mountain view, CA, USA</span>
            <ChevronDown className="w-5 h-5" color="#7C5CFC" />
          </div>
          <User className="w-6 h-6 cursor-pointer" color="#7C5CFC" />
          <ShoppingCart className="w-6 h-6" color="#7C5CFC" />
        </div>
        {/* Mobile Nav */}
        <div className="flex md:hidden ml-2">
          {/* Optionally, add a hamburger menu here for mobile */}
        </div>
      </div>
      {/* Mobile Nav Links */}
      <div className="md:hidden flex justify-center space-x-6 py-2 border-t border-[#E5E5E5] bg-white">
        <NavLink to={"/"} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Home</NavLink>
        <NavLink to={"/reports"} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Reports</NavLink>
        <NavLink to={"/appointments"} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">My Appointments</NavLink>
      </div>
    </div>
  )
}

export default Navbar