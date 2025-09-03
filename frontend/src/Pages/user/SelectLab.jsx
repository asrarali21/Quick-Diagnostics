import React, { useEffect, useState } from 'react'

import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Plus, ArrowUpDown, Star, Calendar, Check } from 'lucide-react'
import { orderState } from '../../store/order.state'
import { useRecoilState } from 'recoil'

function SelectLab() {
  const navigate = useNavigate()

  const [labInfo , setlabInfo]= useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [order,setOrder ] = useRecoilState(orderState)
  console.log(order);
  


      const fetchLabs = async()=>{
    try {
      const response = await axios.get("http://localhost:8000/api/v1/lab/getlab")
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
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4">
        <StepTracker currentStep ={0}/>
      </div>

      {/* Main card */}
      <div className="max-w-[900px] mx-auto mt-4 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-semibold text-gray-900">Select Lab</h2>
            <div className="flex items-center gap-6">
              <button type="button" className="inline-flex items-center gap-2 text-[#7C5CFC] font-medium">
                <Plus className="w-5 h-5" />
                <span>Add Test</span>
              </button>
              <button type="button" className="inline-flex items-center gap-2 text-gray-700">
                <ArrowUpDown className="w-5 h-5" />
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Labs list */}
          <div className="mt-4 space-y-4">
            {labInfo.map((item, idx) => {
              const selected = idx === selectedIndex
              console.log("selected ",selected );
              
              return (
                <button
                  type="button"
                  key={item._id || idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left rounded-2xl border p-5 sm:p-6 transition-colors ${selected ? 'border-2 border-[#7C5CFC]' : 'border-gray-200'}`}
                >
                  {/* top-right check */}
                  <span className={`absolute translate-x-[calc(100%-1.75rem)] -translate-y-3 sm:translate-x-[calc(100%-1.5rem)] right-0 ${selected ? '' : ''}`}></span>
                  <div className="relative">
                    <div className="absolute right-0 -top-2">
                      <span className={`w-6 h-6 rounded-full border grid place-items-center ${selected ? 'bg-[#7C5CFC] border-[#7C5CFC]' : 'border-gray-300 bg-white'}`}>
                        <Check className={`w-4 h-4 ${selected ? 'text-white' : 'text-transparent'}`} />
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      {/* Tiny brand/monogram */}
                      <div className="mt-1 text-[10px] tracking-[0.2em] text-gray-500 font-semibold">
                       <img src={item.image} alt="" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-[18px] font-semibold">{item.name}</p>
                        <div className="mt-2 flex items-center gap-6 text-sm">
                          <span className="inline-flex items-center gap-1 text-gray-700">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            {item.rating}
                          </span>
                          <span className="inline-flex items-center gap-2 text-green-600">
                            <Calendar className="w-4 h-4" />
                            {item.slotsAvailable} Slots Available
                          </span>
                        </div>
                        <p className="mt-3 text-gray-600">Reports ready in {item.reportTime}</p>
                        <p className="mt-4 text-gray-900 font-medium">${item.price} <span className="font-normal text-gray-600">for 1 Test</span></p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" className="text-red-500 font-medium">Cancel</button>
          <div className="flex items-baseline gap-2 text-gray-700">
            <span className="hidden sm:inline">{selectedLab?.name}</span>
            <span className="text-gray-900 font-semibold">${selectedLab?.price}</span>
            <span className="text-gray-500">for 1 Test</span>
          </div>
          <button onClick={()=>navigate('/SelectAppointment')} type="button" className="inline-flex items-center justify-center h-12 px-10 rounded-xl bg-[#7C5CFC] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)]">Select Date & Time</button>
        </div>
      </div>
    </div>
  )
}

export default SelectLab