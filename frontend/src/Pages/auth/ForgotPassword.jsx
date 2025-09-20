import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

function ForgotPassword() {
    const navigate = useNavigate()
  const [email, setEmail] = useState("")
  console.log(email);
  


   const handleClick = async()=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/forgotPassword`, {email :email})
        console.log(response);
        navigate("/resetPassword" , {state:{email:response.data.data}})
    } catch (error) {
        console.log(error);
    }
   }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 px-8 py-10">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Zemoso Diagnostics
        </h1>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Email address</label>
          <input
            type="email"
            className="w-full rounded-md border-2 border-[#6B4DE0] bg-white px-3 py-3 text-gray-900 placeholder-gray-400"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleClick}
          className="w-full rounded-lg bg-[#4d35ac] hover:bg-[#5a3ec7] text-white font-semibold py-3"
        >
          Send OTP
        </button>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Remembered your password?{' '}
          <Link style={{ textDecoration: "none", color: "black" }} to={"/login"} className="font-semibold text-[#6B4DE0]">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
