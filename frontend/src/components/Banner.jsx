import React from 'react'
import FamilyBanner from "../assets/family.svg"

function Banner() {
  return (
    <div className="max-w-7xl  mx-auto px-4 md:px-6 lg:px-2">
      <div 
        className="relative rounded-3xl overflow-hidden"
        style={{ backgroundColor: '#4D1C8C' }}
      >
        <div className="flex items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
          {/* Left Content */}
          <div className="flex-1 max-w-md">
            <h1 className="text-white text-xl lg:text-3xl xl:text-3xl font-bold leading-snug mb-2">
              60% off on your first order
            </h1>
            <p className="text-white/90 text-sm lg:text-base mb-5">
              Your health is our priority
            </p>
            <button className="bg-white text-[#4D1C8C] px-5 py-2 rounded-lg font-semibold text-sm lg:text-base hover:bg-gray-100 transition-colors shadow-md">
              Book now
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0 ml-4">
            <img 
              src={FamilyBanner} 
              alt="Family Health" 
              className="w-52 lg:w-72 xl:w-80 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
