import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { handleError, handlesuccess } from '../../toast.util'
import { useSetRecoilState } from 'recoil'
import { userState } from '../../store/userstate'

function Register() {
  const PRIMARY = '#6B4DE0'
  const PRIMARY_HOVER = '#5a3ec7'

  const [showPassword , setShowPassword] = useState(false)

  const setUser = useSetRecoilState(userState)
  const navigate =useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  console.log(form);
  

   const handleChange = (e)=>{
    const {name , value} = e.target
    setForm(prev => ({...prev , [name]: value}))
   }

  
   async function handleRegistersubmit(e) {
    e.preventDefault();
      const {firstName , lastName  , email} =form
        try {
            const response =await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/signup` , form , {withCredentials:true})
            console.log(response);
            handlesuccess(response.data.message)
            setUser({
                userID:response.data.data.userID,
                firstName:response.data.data.firstName
            })
            setTimeout(()=>{
                navigate("/mobileNo")
            },1500)
         
        } catch (error) {
            handleError(error.response.data.message)
            console.log(error);
        }
    }
 



  return (
    <div className="min-h-screen bg-[#F6F3FA] flex justify-center pt-20 pb-10 px-4">
      {/* Constrain width and prevent card from stretching tall */}
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-[0_12px_40px_-18px_rgba(17,24,39,0.18)] rounded-2xl px-8 pt-8 pb-10">
          <div className="text-center mb-6">
             <p>Quick Diagnostic</p>
          </div>
          {/* Form: tighter vertical rhythm */}
          <form className="space-y-5" onSubmit={handleRegistersubmit}>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-xs font-medium text-[#757380] mb-1 tracking-wide">First Name</label>
              <div className="border-b border-gray-400 focus-within:border-[#6B4DE0] transition-colors">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="eg: Patrick"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full py-2 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-xs font-medium text-[#757380] mb-1 tracking-wide">Last Name</label>
              <div className="border-b border-gray-400 focus-within:border-[#6B4DE0] transition-colors">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="eg: Smith"
                  value={form.lastName}

                  onChange={handleChange}
                 
                  className="w-full py-2 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#757380] mb-1 tracking-wide">Email id</label>
              <div className="border-b border-gray-400 focus-within:border-[#6B4DE0] transition-colors">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="eg: patricksmith@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full py-2 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[#757380] mb-1 tracking-wide">Password</label>
              <div className="relative border-b border-gray-400 focus-within:border-[#6B4DE0] transition-colors">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full py-2 text-[15px] bg-transparent outline-none placeholder:text-gray-400 pr-10"
                />
                <span onClick={()=> setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center text-gray-400">
                  <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
              </div>
            </div>
            {/* Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full h-11 rounded-md text-white text-sm font-medium tracking-wide shadow-[0_8px_18px_-6px_rgba(107,77,224,0.45)] transition-colors"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor=PRIMARY_HOVER}
                onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=PRIMARY}
              >
                Continue
              </button>
            </div>
            {/* Login Link */}
            <div className="text-center -mt-1">
              <span className="text-[13px] text-gray-600">
                Already have an account?{' '}
                <Link to="/login" style={{ color:"#2D2A38" , textDecoration: 'none' }} className="font-semibold text-gray-900 no-underline">
                  Login
                </Link>
              </span>
            </div>
            {/* Divider */}
            <div className="pt-2">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[11px] uppercase tracking-wide text-gray-400">or sign up with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </div>
            {/* Social */}
            <div className="flex justify-center gap-5 pt-1">
              <button
                type="button"
                className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:shadow-sm transition"
              >
                {/* Google SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button
                type="button"
                className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:shadow-sm transition"
              >
                {/* Facebook SVG */}
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                type="button"
                className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:shadow-sm transition"
              >
                {/* Apple SVG */}
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
