import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import axios from 'axios'

function ResetPassword() {
    const navigate = useNavigate()
  
     const  location = useLocation()

     const [inputData , setInputData] = useState({
        otp : "",
        newPassword:""
   })
    console.log(inputData);
    

     const {email} = location?.state || {}
   
     const handleClick = async()=>{
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/resetPassword", { email, otp: inputData.otp.trim(), newPassword: inputData.newPassword })
            console.log(response);
            setTimeout(()=>{
                navigate("/login")
            }, 2000)
        } catch (error) {
             console.log(error);
        }
     }


      function handleChange(e) {
        const {name , value} = e.target
        setInputData(prev=>({...prev , [name]:value}))
      }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 px-8 py-10">
        {/* Brand */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Zemoso Diagnostics" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Zemoso Diagnostics
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">Enter the OTP sent to your email</p>

        {/* OTP */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">OTP</label>
          <input
            type="text"
            name='otp'
            inputMode="numeric"
            className="w-full rounded-md border-2 border-[#6B4DE0] bg-white px-3 py-3 text-gray-900 placeholder-gray-400"
            placeholder="Enter 4-digit OTP"
            value={inputData.otp}
               onChange={(handleChange)}
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="password"
              name='newPassword'
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-gray-900 placeholder-gray-400"
              placeholder="New Password"
               value={inputData.newPassword}
            onChange={(handleChange)}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {/* eye icon placeholder for consistency */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleClick}
          type="button"
          className="w-full rounded-lg bg-[#4d35ac] hover:bg-[#5a3ec7] text-white font-semibold py-3"
        >
          Reset Password
        </button>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Back to{' '}
          <Link style={{ textDecoration: 'none', color: 'black' }} to={'/login'} className="font-semibold text-[#6B4DE0]">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
