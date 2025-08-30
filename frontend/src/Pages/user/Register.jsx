import React from 'react'
import logoname from "../assets/LogoName.svg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { handleError, handlesuccess } from '../../toast.util'
import { useSetRecoilState } from 'recoil'
import { userState } from '../../store/userstate'

function Register() {
  const PRIMARY = '#6B4DE0'
  const PRIMARY_HOVER = '#5a3ec7'

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
            const response =await axios.post("http://localhost:8000/api/v1/users/signup" , form , {withCredentials:true})
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Registration Form */}
        <div className="bg-white shadow-lg rounded-lg px-8 py-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={logoname} alt="Zemoso Diagnostics" className="mx-auto" />
          </div>
          
          <form className="space-y-8" onSubmit={handleRegistersubmit}>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              {/* underline container */}
              <div className="border-b-2 border-gray-500" style={{ outline: 'none' }}>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full px-0 py-3 text-gray-900 bg-transparent outline-none border-none placeholder-gray-400"
                  placeholder="Eg: Patrick"
                  onFocus={(e) => (e.currentTarget.parentElement.style.borderColor = PRIMARY)}
                  onBlur={(e) => (e.currentTarget.parentElement.style.borderColor = '#6B7280')}
                   value={form.firstName}
                     onChange={handleChange}
                />
              </div>
            </div>
       

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              {/* underline container */}
              <div className="border-b-2 border-gray-500" style={{ outline: 'none' }}>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full px-0 py-3 text-gray-900 bg-transparent outline-none border-none placeholder-gray-400"
                  placeholder="Eg: Smith"
                  onFocus={(e) => (e.currentTarget.parentElement.style.borderColor = PRIMARY)}
                  onBlur={(e) => (e.currentTarget.parentElement.style.borderColor = '#6B7280')}
                   value={form.lastName}
                     onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Id
              </label>
              {/* underline container */}
              <div className="border-b-2 border-gray-500" style={{ outline: 'none' }}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-0 py-3 text-gray-900 bg-transparent outline-none border-none placeholder-gray-400"
                  placeholder="Eg: patricksmith@gmail.com"
                  onFocus={(e) => (e.currentTarget.parentElement.style.borderColor = PRIMARY)}
                  onBlur={(e) => (e.currentTarget.parentElement.style.borderColor = '#6B7280')}
                   value={form.email}
                     onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              {/* underline container */}
              <div className="border-b-2 border-gray-500" style={{ outline: 'none' }}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-0 py-3 text-gray-900 bg-transparent outline-none border-none placeholder-gray-400"
                  placeholder="Enter your password"
                  onFocus={(e) => (e.currentTarget.parentElement.style.borderColor = PRIMARY)}
                  onBlur={(e) => (e.currentTarget.parentElement.style.borderColor = '#6B7280')}
                   value={form.password}
                     onChange={handleChange}
                />
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-200"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                Continue
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-2">
              <span className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-black transition duration-200 no-underline">
                  Login
                </Link>
              </span>
            </div>

            {/* Divider */}
            <div className="pt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or sign up with</span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="pt-4">
              <div className="flex justify-center  space-x-4">
                {/* Google */}
                <button
                  type="button"
                  className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition duration-200"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition duration-200"
                >
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition duration-200"
                >
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
