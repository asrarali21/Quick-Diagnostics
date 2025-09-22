import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../store/userstate'
import { useEffect } from 'react'
import axios from 'axios'
import { handlesuccess } from '../../toast.util'
import { useNavigate } from 'react-router-dom'

function EntermobileNum() {

    // const { userID, firstName } = useRecoilValue(userState)
    // console.log(userID);
     // we can use recoil state to show also but when user refresh the name cant persist
   const navigate = useNavigate()
    const [info , setmyinfo] = useState()
    const[userID , setmyUserID] = useState()
    console.log(userID);
    
   
    const [number , setNumber] = useState()



    const handleGetOtpClick = async()=>{
      try {
        const response  = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/sendotp`, {  phoneNumber: number , userID } , {withCredentials:true})
        console.log(response);
        handlesuccess(response.data.message)
        setTimeout(()=>{
          navigate("/verifyOtp")
        })  
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(() => {
       const userdata = async()=>{
        try {
             const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me` ,{withCredentials:true})
             console.log(response);
             setmyinfo(response.data.data.firstName)
             setmyUserID(response.data.data._id)
        } catch (error) {
            console.log(error);
        }
       }
  userdata()
    }, [])

    
  return (
    <div className="min-h-screen bg-[#a4b4d9] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 px-8 py-10">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-xl font-semibold text-gray-800">hey {info}</h1>
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
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-[#CCD4FF] text-white font-semibold py-3
                       transition-colors duration-200 hover:bg-[#647FBC]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#647FBC]
                       active:bg-[#647FBC] cursor-pointer"
            onClick={handleGetOtpClick}
          >
            Get OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default EntermobileNum
