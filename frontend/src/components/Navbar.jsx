import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { ChevronDown, MapPin, ShoppingCart, User, } from "lucide-react"
import { useSetRecoilState } from 'recoil'
import AccountSidebar from './AccountSidebar'
import axios from 'axios';
import { authModalOpenState, authModalTabState } from '../store/authModal.state'

function Navbar() {
  const [isAccountSidebarOpen, setIsAccountSidebarOpen] = useState(false)
  const setAuthModalOpen = useSetRecoilState(authModalOpenState)
  const setAuthModalTab = useSetRecoilState(authModalTabState)

  const [location, setlocation] = useState({ latitude: null, longitude: null, error: null })
  const [formattedLocation, setFormattedLocation] = useState("")

  const handleOpenAuthModal = (tab = 'login') => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
  }

  async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setlocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        try {
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=8dc34af6f7d34bf58b405b84f5eaecce`);
          console.log(response.data.results[0].components);

          const components = response.data.results[0]?.components;
          const shortLocation = `${components.neighbourhood || components.suburb || components.postcode}, ${components.state_district || components.country}`;
          setFormattedLocation(shortLocation);

        } catch (error) {
          // Handle error if needed
        }
      },
        (error) => {
          setlocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      )
    } else {
      setlocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E5E5E5]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 h-14">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2 min-w-[180px]">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <span className="text-lg font-medium" style={{ color: '#647FBC' }}>Quick Diagnostics</span>
          </NavLink>
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to={"/"} style={{ color: '#5A5766', textDecoration: 'none' }} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Home</NavLink>
          <NavLink to={"/reports"} style={{ color: '#5A5766', textDecoration: 'none' }} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Reports</NavLink>
          <NavLink to={"/appointments"} style={{ color: '#5A5766', textDecoration: 'none' }} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">My Appointments</NavLink>
        </div>

        {/* Login Button - centered between nav and location */}
        <button
          onClick={() => handleOpenAuthModal('login')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[#647FBC] text-sm font-medium border border-[#647FBC] rounded-lg hover:bg-[#647FBC] hover:text-white transition-all duration-200 mx-6"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Login
        </button>

        {/* Right section: Location + User */}
        <div className="flex items-center space-x-4 justify-end">
          {/* Location */}
          <div className="hidden lg:flex items-center border-b border-gray-300 pr-2 space-x-1 text-gray-600">
            <MapPin className="w-4 h-4" color="#647FBC" />
            <span className="text-sm max-w-[140px] truncate">
              {formattedLocation || 'Fetching...'}</span>
          </div>

          {/* User Icon */}
          <User
            className="w-5 h-5 cursor-pointer"
            color="#647FBC"
            onClick={() => setIsAccountSidebarOpen(true)}
          />
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

      {/* Account Sidebar */}
      <AccountSidebar
        isOpen={isAccountSidebarOpen}
        onClose={() => setIsAccountSidebarOpen(false)}
      />
    </div>
  )
}

export default Navbar