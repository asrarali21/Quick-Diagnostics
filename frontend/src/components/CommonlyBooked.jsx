import React from 'react'
import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
import { ChevronsRight } from 'lucide-react'
import  ChooseBanner from "../assets/ChooseBanner.png"
import { useNavigate } from 'react-router-dom'
import { TestdataApiState } from '../store/test.state'

function CommonlyBooked() {
    const TestDataicon = useRecoilValue(TestdataApiState)
    console.log(TestDataicon);
    
    const navigate = useNavigate()

    function HandleClick(id) {
        navigate(`/testinfo/${id}`) 
    }
    
  return (
    <>
    <div className='flex w-full max-w-7xl mx-auto px-4 sm:px-8 justify-between m-3 pr-5 my-12 '>
        <h1 className='text-2xl font-semibold text-gray-900'>Commonly Booked Test</h1>
        <span className='text-[#7C5CFC] font-medium cursor-pointer hover:underline flex items-center  font-medium'>see more<ChevronsRight className='w-5 h-5 ml-1  '/> </span>
        
        </div>
    <div className='flex w-full max-w-7xl mx-auto px-4 sm:px-8 flex-wrap my-12'>
        {TestDataicon.map((item , i )=>(
            <>
            <img onClick={()=>HandleClick(item.id)} key={i} className='cursor-pointer' src={item.icon} alt="" />
            <p>{item.testName}</p>
            </>
        ))}
        </div>
        <div className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
            <img className='w-full' src={ChooseBanner} alt="" />
        </div>
    </>
  )
}

export default CommonlyBooked