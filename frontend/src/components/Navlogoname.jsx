import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

function Navlogoname() {
  return (
    <nav className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
        <Link style={{textDecoration:"none"}} className="flex items-center gap-3 group">
          {/* Brand logo image */}
          
          <img
            src={logo}
            alt="Zemoso Diagnostics"
            className="h-7 w-auto object-contain select-none group-hover:opacity-90 transition-opacity"
            draggable={false}
          />
          {/* Brand text */}
          <span className="text-[#7C5CFC] font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap">Zemoso Diagnostics</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navlogoname
