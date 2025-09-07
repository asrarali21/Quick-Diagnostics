import React from 'react'
import { ArrowLeft, Calendar, Check, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BreadCrum from '../../components/BreadCrum'
import axios from 'axios'
import { handleError, handlesuccess } from '../../toast.util'
import { useRecoilState } from 'recoil'
import { orderState } from '../../store/order.state'
import Navlogoname from '../../components/Navlogoname'

function AddPatient() {

  const navigate = useNavigate()

  const [step , setstep] = useState(1)
  const [selected, setSelected] = useState(true)
  const [saveDetails , setSavedetails] = useState(false)
  const [order , setOrder] = useRecoilState(orderState)
  console.log(order);
  

  const [FormData , setFormData] = useState({
    bookingforWhom:"Myself",
    name:"",
    DOB:"",
    gender:""
  })
  console.log(FormData);
  

   const bookingOptions = ["Myself", "Mother", "Father", "Son", "Daughter", "Others"];

   const handleNextclick = async()=>{
   
      if(!FormData.name?.trim() || !FormData.DOB || !FormData.gender){
        handleError('Please fill all fields')
        return
      }

      // Map display values to backend enum values
      const normalized = {
        bookingforWhom: FormData.bookingforWhom === 'Others' ? 'Other' : (FormData.bookingforWhom === 'Son' ? 'son' : FormData.bookingforWhom),
        name: FormData.name.trim(),
        DOB: FormData.DOB,
        gender: (FormData.gender || '').toLowerCase(),
      }

      try {
        const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
        const response = await axios.post(`${base}/api/v1/patient/patientdetails` , normalized , {withCredentials:true})
        console.log(response.data.data._id);
        setOrder({
          ...order,
          patient:response.data.data._id
        })
        
        // go to selection screen on success
        setstep(2)
      } catch (error) {
        console.log("patient details : " , error?.response?.data || error.message);
        handleError(error.response.data.message)
      }
   }

   function calculateAge(dob) {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

  const relationLabel = FormData.bookingforWhom === 'Myself' ? 'Self' : FormData.bookingforWhom


  return (
    step === 1 ? (

        <div className="min-h-screen relative pb-24">
          <Navlogoname/>
        {/* Header: Back (left) + centered breadcrumb */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
        <button onClick={()=>navigate(-1)} type="button" className="inline-flex items-center gap-2 text-[#7C5CFC]">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
        </button>
        </div>
        <div className="justify-self-center">
        <BreadCrum/>
        </div>
        <div className="justify-self-end" />
        </div>
        </div>
        
        {/* Main card */}
        <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
        <h2 style={{color:"#5a5766"}}className="text-[24px] font-semibold ">Add Patient Details</h2>
      

          {/* Booking for whom */}
          <div className="mt-6">
            <p className="text-[14px] text-[#6F6C90] font-medium">Booking for whom</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {bookingOptions.map((options) => (
          <button
              key={options}
              type="button"
              onClick={()=> setFormData({...FormData , bookingforWhom:options})}
               className={`h-10 px-4 rounded-full ${
                FormData.bookingforWhom === options
                  ? "bg-[#9E62B2] text-white"
                  : "bg-[#EDEDF3] text-[#6F6C90]"
              } text-[14px] font-medium`}
            >
              {options}
            </button>
              ))}
              
            </div>
          </div>

          {/* Name */}
            <div className="mt-6">
        <p className="text-[14px] text-[#6F6C90] font-medium">Name</p>
        <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
        <input
          type="text"
          name="name"
          value={FormData.name}
          onChange={(e)=>setFormData(prev => ({...prev , name :e.target.value}))}
          placeholder="Patrick Smith"
          className="w-full outline-none text-[16px] text-gray-900 placeholder:text-gray-400 bg-transparent"
          required
        />
        </div>
      </div>
          {/* Date of Birth */}
           <div className="mt-6">
        <p className="text-[14px] text-[#6F6C90] font-medium">Date of Birth</p>
        <div className="mt-2 relative border-b border-gray-200 pb-3">
        <input
          type="date"
          name="dob"
          value={FormData.DOB}
          onChange={(e)=>setFormData(prev=>({...prev , DOB:e.target.value}))}
          className="w-full pr-8 outline-none text-[16px] text-gray-900 bg-transparent"
          required
        />
        <Calendar className="w-5 h-5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
        </div>
      </div>

          {/* Gender */}
          <div className="mt-6">
            <p className="text-[14px] text-gray-900 font-medium">Gender</p>
            <div className="mt-3 flex items-center gap-8">
              <div className="inline-flex items-center gap-8">
          {["Male", "Female", "Others"].map((item)=>(
             <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={item}
                checked={FormData.gender === item}
                onChange={(e)=>setFormData(prev => ({...prev , gender : e.target.value}))}
                className="sr-only"
                required
              />
              <span className={`relative w-5 h-5 rounded-full border-2 grid place-items-center ${FormData.gender===item ? 'border-[#7C5CFC]' : 'border-gray-300'}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${FormData.gender===item ? 'bg-[#7C5CFC]' : 'bg-transparent'}`} />
              </span>
              <span className="text-[14px] text-gray-700">{item}</span>
            </label>
          ))}
              </div>
            </div>
          </div>

          {/* Save details */}
          {/* <div className="mt-6">
            <label className="inline-flex items-center gap-3">
              <span className="w-5 h-5 rounded-md bg-[#7C5CFC] grid place-items-center">
                
                <Check className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-[14px] text-gray-700">Save details for future</span>
            </label>
          </div> */}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
          <button onClick={handleNextclick} type="button" className="inline-flex items-center justify-center h-12 px-10 rounded-xl bg-[#7C5CFC] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)]">Next</button>
        </div>
      </div>
    </div>
   ) : (
        <div className="min-h-screen relative pb-24">
          {/* Header */}
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6">
            <div className="grid grid-cols-3 items-center">
              <div className="justify-self-start">
                <button onClick={()=>navigate(-1)} type="button" className="inline-flex items-center gap-2 text-[#7C5CFC]">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back</span>
                </button>
              </div>
              <div className="justify-self-center">
                <BreadCrum />
              </div>
              <div className="justify-self-end" />
            </div>
          </div>

          {/* Main card: Patients list */}
          <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-6">
            <Navlogoname/>
            <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-gray-900">Add Patient</h2>
                <button type="button" onClick={()=>setstep(1)} className="inline-flex items-center gap-2 text-[#7C5CFC] font-medium">
                  <Plus className="w-5 h-5" />
                  <span>New Patient</span>
                </button>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={()=>setSelected(v=>!v)}
                      aria-pressed={selected}
                      className={`mt-1 w-4 h-4 rounded-[4px] grid place-items-center ${selected ? 'bg-[#9E62B2]' : 'bg-gray-200'}`}
                    >
                      <Check className={`w-3 h-3 ${selected ? 'text-white' : 'text-transparent'}`} />
                    </button>
                    <div>
                      <p className="text-gray-900 font-medium">{FormData.name || 'Patrick Smith'}</p>
                      <p className="text-sm text-gray-500">{relationLabel}, {FormData.gender || 'Male'}, {calculateAge(FormData.DOB) || '30'} years</p>
                    </div>
                  </div>
                  <button type="button" onClick={()=>setstep(1)} className="text-[#7C5CFC] font-medium">Edit</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
              <button type="button" className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
              <div className="text-gray-700 font-medium">{selected ? '1 Patient Selected' : 'No Patient Selected'}</div>
              <button onClick={()=>navigate("/lab")} type="button" disabled={!selected} className={`inline-flex items-center justify-center h-12 px-10 rounded-xl font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)] ${selected ? 'bg-[#7C5CFC] text-white hover:bg-[#6B4EE6]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Select Lab</button>
            </div>
          </div>
        </div>
   )
  )
}

export default AddPatient