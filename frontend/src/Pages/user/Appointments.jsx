import React from 'react'
import { useNavigate } from 'react-router-dom'

function Appointments() {

  const navigate  = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff]">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <svg
          className="w-16 h-16 text-[#647FBC] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10m-12 8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Appointments Yet</h2>
        <p className="text-gray-500 text-center mb-4">
          You currently have no appointments scheduled.<br />
          Book a test or appointment to see it here!
        </p>
        <button
          className="px-6 py-2 bg-[#647FBC] text-white rounded-lg shadow hover:bg-[#50628d] transition"
          onClick={()=>navigate("/home")}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default Appointments