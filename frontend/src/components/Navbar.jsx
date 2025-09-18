import React, { useEffect, useState } from 'react'
import  { NavLink } from "react-router-dom"
import  { ChevronDown, MapPin, ShoppingCart, User,  } from "lucide-react"
import AccountSidebar from './AccountSidebar'
import axios from 'axios';

function Navbar() {
  const [isAccountSidebarOpen, setIsAccountSidebarOpen] = useState(false)

   const [location , setlocation] = useState({ latitude: null, longitude: null, error: null })
   const [formattedLocation , setFormattedLocation] = useState("")
   

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

           const shortLocation = `${components.neighbourhood  || components.suburb || components.postcode}, ${components.state_district || components.country}`;

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
        }else{
           setlocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
        }
    }
 
    useEffect(()=>{
       getLocation()
    }, [])



  return (
  <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E5E5E5]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 h-14">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2 min-w-[220px]">
          <span className="text-lg font-medium" style={{ color: '#7C5CFC' }}>Quick Diagnostics</span>
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink to={"/home"}  style={{ color: '#5A5766', textDecoration: 'none' }}  className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Home</NavLink>
          <NavLink to={"/reports"} style={{ color: '#5A5766', textDecoration: 'none' }} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">Reports</NavLink>
          <NavLink to={"/appointments"} style={{ color: '#5A5766', textDecoration: 'none' }} className="text-gray-600 text-base font-medium hover:text-[#7C5CFC] transition-colors duration-150">My Appointments</NavLink>
        </div>
        {/* Location and Icons */}
        <div className="flex items-center space-x-6 min-w-[260px] justify-end">
          <div className="flex items-center border-b border-gray-300 pr-2 space-x-1 text-gray-600">
            <MapPin className="w-5 h-5" color="#7C5CFC" />
          <span className="text-base">
  {formattedLocation || 'Fetching location...'}</span>
          
          </div>
          <User 
            className="w-6 h-6 cursor-pointer" 
            color="#7C5CFC" 
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