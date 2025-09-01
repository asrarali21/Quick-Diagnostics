import React from 'react'
import { ArrowLeft, Calendar, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AddPatient() {

  const navigate = useNavigate()


  return (
    <div className="min-h-screen relative pb-24">
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
            <nav className="flex items-center gap-4 text-[16px]">
              <span className="text-[#6F6C90]">Home</span>
              <span className="h-px w-20 bg-gray-300" />
              <span className="text-[#6F6C90]">Covid RTPCR</span>
              <span className="h-px w-20 bg-gray-300" />
              <span className="text-gray-900 font-semibold">Add Patient</span>
            </nav>
          </div>
          <div className="justify-self-end" />
        </div>
      </div>

      {/* Main card */}
      <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
          <h2 className="text-[24px] font-semibold text-gray-900">Add Patient Details</h2>

          {/* Booking for whom */}
          <div className="mt-6">
            <p className="text-[14px] text-[#6F6C90] font-medium">Booking for whom</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="h-10 px-4 rounded-full bg-[#7C5CFC] text-white inline-flex items-center justify-center text-[14px] font-medium">Myself</span>
              <span className="h-10 px-4 rounded-full bg-[#EDEDF3] text-[#6F6C90] inline-flex items-center justify-center text-[14px] font-medium">Mother</span>
              <span className="h-10 px-4 rounded-full bg-[#EDEDF3] text-[#6F6C90] inline-flex items-center justify-center text-[14px] font-medium">Father</span>
              <span className="h-10 px-4 rounded-full bg-[#EDEDF3] text-[#6F6C90] inline-flex items-center justify-center text-[14px] font-medium">Son</span>
              <span className="h-10 px-4 rounded-full bg-[#EDEDF3] text-[#6F6C90] inline-flex items-center justify-center text-[14px] font-medium">Daughter</span>
              <span className="h-10 px-4 rounded-full bg-[#EDEDF3] text-[#6F6C90] inline-flex items-center justify-center text-[14px] font-medium">Others</span>
            </div>
          </div>

          {/* Name */}
          <div className="mt-6">
            <p className="text-[14px] text-[#6F6C90] font-medium">Name</p>
            <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-[16px] text-gray-900">Patrick Smith</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mt-6">
            <p className="text-[14px] text-[#6F6C90] font-medium">Date of Birth</p>
            <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-[16px] text-gray-900">01/11/1990</span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Gender */}
          <div className="mt-6">
            <p className="text-[14px] text-gray-900 font-medium">Gender</p>
            <div className="mt-3 flex items-center gap-8">
              <div className="inline-flex items-center gap-2">
                <span className="relative w-5 h-5 rounded-full border-2 border-[#7C5CFC] grid place-items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC]" />
                </span>
                <span className="text-[14px] text-gray-700">Male</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-gray-300" />
                <span className="text-[14px] text-gray-700">Female</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-gray-300" />
                <span className="text-[14px] text-gray-700">Others</span>
              </div>
            </div>
          </div>

          {/* Save details */}
          <div className="mt-6">
            <label className="inline-flex items-center gap-3">
              <span className="w-5 h-5 rounded-md bg-[#7C5CFC] grid place-items-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-[14px] text-gray-700">Save details for future</span>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" className="text-red-500 font-medium">Cancel</button>
          <button type="button" className="inline-flex items-center justify-center h-12 px-10 rounded-xl bg-[#7C5CFC] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)]">Next</button>
        </div>
      </div>
    </div>
  )
}

export default AddPatient