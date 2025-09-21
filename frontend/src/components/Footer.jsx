import React from 'react'

import PlayStore from '../assets/Googleplay.png'

import { FaFacebookF, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#4D1C8C] py-12">
      <footer className="w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left: Logo and Links */}
          <div className="flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-6">
              <span className="text-white font-semibold text-lg">Quick Diagnostics</span>
            </div>
            <nav className="flex flex-col space-y-2">
              <a  className="text-white text-sm hover:underline">Home</a>
              <a className="text-white text-sm hover:underline">Contact us</a>
              <a  className="text-white text-sm hover:underline">Privacy policy</a>
              <a  className="text-white text-sm hover:underline">Terms & conditions</a>
            </nav>
          </div>
          {/* Right: App Stores and Social */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex flex-col space-y-3 mb-4">
              <img src={PlayStore} alt="Google Play" className="h-10" />
            </div>
            <div className="flex space-x-4">
              <a className="text-white text-xl"><FaFacebookF /></a>
              <a className="text-white text-xl"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer