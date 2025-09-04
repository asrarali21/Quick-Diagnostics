import React from 'react'
import FamilyBanner from "../assets/family.svg"

function Banner() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-2">
      <div 
        className="relative rounded-3xl overflow-hidden"
        style={{ backgroundColor: '#4D1C8C' }}
      >
        <div className="flex items-center justify-between px-8 py-8 lg:px-12 lg:py-12">
          {/* Left Content */}
          <div className="flex-1 max-w-md">
            <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-3">
              60% off on your first order
            </h1>
            <p className="text-white/90 text-base lg:text-lg mb-6">
              Your health is our priority
            </p>
            <button className="bg-white text-[#4D1C8C] px-6 py-2.5 rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-lg">
              Book now
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0 ml-6">
            <img 
              src={FamilyBanner} 
              alt="Family Health" 
              className="w-64 lg:w-80 xl:w-96 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
