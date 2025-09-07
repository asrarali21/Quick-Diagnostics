import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handlesuccess } from '../../toast.util';
import logo from "../../assets/logo.svg"

function Login() {

    const navigate = useNavigate()

    const [Userinfo , setUserInfo] = useState({
       email:"",
       password:""
    })
    console.log(Userinfo);

    async function handleClick() {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/users/login" , Userinfo , {withCredentials:true})
        console.log(response);
        handlesuccess(response.data.message)
        setTimeout(() => {
          navigate("/home")
        }, 1000);
      } catch (error) {
        console.log(error);
        handleError(error.response.data.message)
        
      }
    }
    

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 px-8 py-10">
        {/* Brand circle */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Zemoso Diagnostics
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">Email address</label>
          <input
            type="email"
            className="w-full rounded-md border-2 border-[#6B4DE0] bg-white px-3 py-3 text-gray-900 placeholder-gray-400"
            placeholder=""
            value={Userinfo.email}
            onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <div className="relative">
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-gray-900 placeholder-gray-400"
              placeholder="Password"
               value={Userinfo.password}
                 onChange={(e) => setUserInfo(prev => ({ ...prev, password: e.target.value }))}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {/* eye icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Forgot password */}
        <div className="mb-6">
          <a href="#" className="text-sm font-semibold text-[#6B4DE0]">
            Forgot Password?
          </a>
        </div>

        {/* Login button (pale primary as in screenshot) */}
        <button
          type="button"
          className="w-full rounded-lg bg-[#CCD4FF] hover:bg-[#5a3ec7] text-white font-semibold py-3 mb-6"
          onClick={handleClick}
        >
          Login
        </button>

        {/* Sign up prompt */}
        <p className="text-center text-sm text-gray-700 mb-6">
          Don’t have an account?{' '}
          <Link to={"/"} className="font-semibold text-[#6B4DE0]">Sign up</Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          className="w-full rounded-md bg-white border border-gray-300 py-3 px-4 flex items-center justify-center gap-3 text-gray-800 hover:bg-gray-50"
        >
          {/* Google G */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 4 1.5l2.7-2.6C16.7 2.6 14.5 1.8 12 1.8 6.9 1.8 2.8 5.9 2.8 11s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1-.1-1.5H12Z"/>
            <path fill="#34A853" d="M3.7 7.6l3.2 2.3C7.7 8 9.7 6.4 12 6.4c1.9 0 3.2.8 4 1.5l2.7-2.6C16.7 3.6 14.5 2.8 12 2.8 8.5 2.8 5.6 4.7 3.7 7.6Z"/>
            <path fill="#FBBC05" d="M12 20.2c3.8 0 5.3-2.5 5.5-3.8h-5.5v-3.9h9.1c.1.5.1.9.1 1.5 0 5.2-3.5 8.9-8.8 8.9-4.1 0-7.6-2.8-8.8-6.6l3.3-2.6c.8 2.4 3 4.1 5.1 4.1Z"/>
            <path fill="#4285F4" d="M3.2 13.6C2.9 12.8 2.8 11.9 2.8 11s.1-1.8.4-2.6l3.3 2.6c-.1.3-.1.7-.1 1s0 .7.1 1l-3.3 2.6Z"/>
          </svg>
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
