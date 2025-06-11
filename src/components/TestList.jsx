import React from 'react'
import {  useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'

function TestList() {
    const TestData = useRecoilValue(apiDataState)
    console.log(TestData);
    
  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-12 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tests You Can Choose From</h1>
          <span className="flex items-center text-[#7C5CFC] font-medium cursor-pointer hover:underline">
            See more
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {TestData.slice(0,3).map((item , i )=>(
            <div key={i} className='flex bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 items-center'>
              <img src={item.image} alt="" className="w-32 h-32 object-contain mr-6" />
              <div className="flex flex-col justify-between h-full">
                <p className="text-lg font-semibold text-gray-900 mb-1">{item.name}</p>
                <p className="text-base text-gray-700 mb-1">Starting from {item.price}</p>
                <p className="text-sm text-gray-500 mb-1">{item.reportTime}</p>
                <p className="text-sm text-gray-500 mb-1">{item.testsIncluded}</p>
                <p className="text-[#7C5CFC] font-medium text-sm mt-2 cursor-pointer hover:underline">View Details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TestList