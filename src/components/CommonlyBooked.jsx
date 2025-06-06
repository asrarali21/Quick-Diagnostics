import React from 'react'
import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
import { ChevronsRight } from 'lucide-react'
import  ChooseBanner from "../assets/ChooseBanner.png"
import { useNavigate } from 'react-router-dom'

function CommonlyBooked() {
    const apidata = useRecoilValue(apiDataState)
    const navigate = useNavigate()

    function HandleClick(id) {
        navigate(`/testinfo/${id}`)
     
        
    }
    
  return (
    <>
    <div className='flex justify-between m-3 pr-5'>
        <h1>Commonly Booked Test</h1>
        <span>see more<ChevronsRight/> </span>
        
    </div>
    <div className='flex flex-wrap '>
        {apidata.map((item , i )=>(
            <img onClick={()=>HandleClick(item.id)} key={i} className='cursor-pointer' src={item.icon} alt="" />
        ))}
        </div>
        <div>
            <img src={ChooseBanner} alt="" />
        </div>
    </>
  )
}

export default CommonlyBooked