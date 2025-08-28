import React from 'react'
import logoname from "../assets/LogoName.svg"
import { useRecoilValue } from 'recoil'
import { userState } from '../store/userstate'
import { useEffect } from 'react'
import axios from 'axios'

function EntermobileNum() {

    const userValue = useRecoilValue(userState)
    console.log(userValue);

    useEffect(() => {
       const userdata = async()=>{
        try {
             const response = await axios.get("http://localhost:8000/api/v1/users/me")
             console.log(response);
             
        } catch (error) {
            console.log(error);
        }
       }
  userdata()
    }, [])

    
  return (
    <div className="min-h-screen bg-[#F8F5FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 px-8 py-10">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <img src={logoname} alt="" />
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-xl font-semibold text-gray-800">hey {userValue.firstName}</h1>
            <p className="text-gray-500 mt-1">Enter your Mobile number</p>
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm text-gray-600 mb-3">Mobile Number</label>
            <div className="border-b border-gray-200">
              <input
                id="mobile"
                type="text"
                placeholder="+91 "
                className="w-full bg-transparent outline-none px-0 py-3 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-[#CCD4FF] text-white font-semibold py-3"
          >
            Get OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default EntermobileNum
