import React, { useEffect, useState } from 'react'

import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Plus, ArrowUpDown, Star, Calendar, Check } from 'lucide-react'
import { orderState } from '../../store/order.state'
import { useRecoilState } from 'recoil'
import Navlogoname from '../../components/Navlogoname'

function SelectLab() {
  const navigate = useNavigate()

  const [labInfo , setlabInfo]= useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [order,setOrder ] = useRecoilState(orderState)
  console.log(order);
  


      const fetchLabs = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/lab/getlab`)
      setlabInfo(response.data.data || [])
      console.log(response);
      
    
    } catch (error) {
      console.log(error);
      
    }
    }
    
  
  useEffect(()=>{
    fetchLabs()
  }, [])

  const selectedLab = labInfo?.[selectedIndex]



    useEffect(() => {
    if (selectedLab?._id) {
      setOrder(prev => ({ ...prev, lab: selectedLab._id }))
    }
  }, [selectedLab, setOrder])

  
  
  

  return (
    <div className="min-h-screen relative pb-24">
      <Navlogoname/>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4">
        <StepTracker currentStep ={0}/>
      </div>

      {/* Main card */}
      <div className="max-w-[900px] mx-auto mt-4 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-semibold text-heading">Select Lab</h2>
            <div className="flex items-center gap-6">
              <button type="button" className="inline-flex items-center gap-2 text-[#6B4DE0] font-medium">
                <Plus className="w-5 h-5" />
                <span>Add Test</span>
              </button>
              <button type="button" className="inline-flex items-center gap-2 text-[#757380] font-medium">
                <ArrowUpDown className="w-5 h-5" />
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Labs list */}
          <div className="mt-4 space-y-6">
            {labInfo.map((item, idx) => {
              const selected = idx === selectedIndex
              return (
                <button
                  type="button"
                  key={item._id || idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-full text-left rounded-2xl p-6 transition-colors bg-white border ${selected ? 'border-[#9E62B2]' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {selected && (
                    <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#9E62B2] grid place-items-center shadow-sm">
                      <Check className="w-4 h-4 text-white" />
                    </span>
                  )}
                  <div className="flex items-start gap-6">
                    <div className="pt-1 text-[11px] leading-4 tracking-[0.25em] font-semibold text-heading w-[52px] flex-shrink-0"><img src={item.image} alt="" className="w-12 h-12 object-cover rounded-md" /></div>
                    <div className="flex-1">
                      <p className="text-heading text-[20px] leading-6 font-semibold">{item.name}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-8 text-sm">
                        <span className="inline-flex items-center gap-1 text-[#5A5766]">
                          <Star className="w-4 h-4 text-[#C5C3CA]" />
                          {item.rating}
                        </span>
                        <span className="inline-flex items-center gap-2 text-green-600">
                          <Calendar className="w-4 h-4" />
                          {item.slotsAvailable} Slots Available
                        </span>
                      </div>
                      <p className="mt-4 text-[#5A5766] text-[15px] leading-5">Reports ready in {item.reportTime}</p>
                      <p className="mt-5 text-heading font-semibold text-[20px] leading-6">₹{item.price} <span className="font-normal text-[#5A5766] text-[16px] ml-1">for 1 Test</span></p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
          <div className="flex items-baseline gap-2 text-[#5A5766] text-sm">
            <span className="hidden sm:inline text-heading font-medium">{selectedLab?.name}</span>
            <span className="text-heading font-semibold text-[16px]">${selectedLab?.price}</span>
            <span className="text-[#5A5766]">for 1 Test</span>
          </div>
          <button  onClick={()=>navigate('/SelectAppointment')} type="button" className="inline-flex items-center justify-center h-12 px-10 rounded-xl bg-[#6B4DE0] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)]">Select Date & Time</button>
        </div>
      </div>
    </div>
  )
}

export default SelectLab