import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handlesuccess } from '../../toast.util';


function Login() {

    const navigate = useNavigate()
    
    const [showPassword , setShowPassword] = useState(false)

    const [Userinfo , setUserInfo] = useState({
       email:"",
       password:""
    })
    console.log(Userinfo);

    async function handleClick() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login` , Userinfo , {withCredentials:true})
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
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Quick Diagnostics
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
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-gray-900 placeholder-gray-400"
              placeholder="Password"
               value={Userinfo.password}
                 onChange={(e) => setUserInfo(prev => ({ ...prev, password: e.target.value }))}
            />
            <span onClick={()=>setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {/* eye icon */}
              <svg className="w-5 h-5 cursor-pointer"  viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Forgot password */}
        <div className="mb-6">
          <Link to={"/forgotPassword"} style={{textDecoration:"none", color:"black"}} className="text-sm cursor-pointer font-semibold text-[#6B4DE0]">
            Forgot Password?
          </Link>
        </div>

        {/* Login button (pale primary as in screenshot) */}
        <button
          type="button"
          className="w-full rounded-lg bg-[#4d35ac] hover:bg-[#5a3ec7] text-white font-semibold py-3 mb-6"
          onClick={handleClick}
        >
          Login
        </button>

        {/* Sign up prompt */}
        <p className="text-center text-sm text-gray-700 mb-6">
          Don’t have an account?{' '}
          <Link style={{textDecoration:"none", color:"black"}} to={"/"} className="font-semibold  text-[#6B4DE0]">Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default Login
