import React from 'react'
import { Link } from 'react-router-dom'

function Navlogoname() {
  return (
    <nav className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
        <Link style={{textDecoration:"none"}} className="flex items-center gap-3 group">
          {/* Brand text */}
          <span className="text-[#647FBC] font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap">Quick Diagnostics</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navlogoname
