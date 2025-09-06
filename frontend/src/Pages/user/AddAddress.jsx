import React, { useState } from 'react'
import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Plus } from 'lucide-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { orderState } from '../../store/order.state'
import { handleError } from '../../toast.util'

function AddAddress() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(true)

    const [order , setOrder] = useRecoilState(orderState)
  console.log(order);
  
    
     

    const [addressInfo , setAddressInfo] = useState({
      houseNo:"",
      road:"",
      zipCode:"",
      cityState:""
    })

    const [step , setstep] = useState(0)

    console.log(addressInfo);
    
    const addressPost = async ()=>{
      try {
        const response = await axios.post("http://localhost:8000/api/v1/address/saveaddress" , addressInfo , {withCredentials:true})
        console.log(response);
        setOrder({
          ...order ,
          address:response.data.data._id
        })
        setstep(1)
      } catch (error) {
        console.log(error);
        handleError(error.response.data.message)
      }
    }
    async function HandleClick() {
    try {
      // build payload from current order (IDs expected by backend)
      const payload = {
        patient: order.patient,
        test: order.test,
        lab: order.lab,
        slot: order.slot,
        address: order.address
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/order/createorder",
        payload,
        { withCredentials: true }
      )
      console.log(response);
      
      const orderId = response?.data?.data?._id
      if (!orderId) return
      navigate(`/revieworder/${orderId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen relative pb-24">
      {step === 0 ? (
        <>
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
                <StepTracker currentStep={2} />
              </div>
              <div className="justify-self-end" />
            </div>
          </div>

          {/* Main card */}
          <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
              <h2 className="text-[24px] font-semibold text-gray-900">Add Address</h2>

              {/* House/Flat/Block No */}
              <div className="mt-6">
                <p className="text-[14px] text-[#6F6C90] font-medium">House/ Flat/ Block No.</p>
                <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
                  <input
                    type="text"
                    value={addressInfo.houseNo}
                    onChange={(e) => setAddressInfo(prev => ({ ...prev, houseNo: e.target.value }))}
                    placeholder="2235 California Street  APT#021"
                    className="w-full outline-none text-[16px] text-gray-900 placeholder:text-gray-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Road/Area */}
              <div className="mt-6">
                <p className="text-[14px] text-[#6F6C90] font-medium">Road / Area</p>
                <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
                  <input
                    type="text"
                    value={addressInfo.road}
                    onChange={(e) => setAddressInfo(prev => ({ ...prev, road: e.target.value }))}
                    placeholder="Mountain View California"
                    className="w-full outline-none text-[16px] text-gray-900 placeholder:text-gray-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Zipcode */}
              <div className="mt-6">
                <p className="text-[14px] text-[#6F6C90] font-medium">Zipcode</p>
                <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
                  <input
                    type="text"
                    value={addressInfo.zipCode}
                    onChange={(e) => setAddressInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="11023"
                    className="w-full outline-none text-[16px] text-gray-900 placeholder:text-gray-400 bg-transparent"
                  />
                </div>
              </div>

              {/* City, State */}
              <div className="mt-6">
                <p className="text-[14px] text-[#6F6C90] font-medium">City, State</p>
                <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-3">
                  <input
                    type="text"
                    value={addressInfo.cityState}
                    onChange={(e) => setAddressInfo(prev => ({ ...prev, cityState: e.target.value }))}
                    placeholder="Mountain View ,California"
                    className="w-full outline-none text-[16px] text-gray-900 placeholder:text-gray-400 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
              <button type="button" className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
              <button onClick={addressPost} type="button" className="inline-flex items-center justify-center h-12 px-10 rounded-xl bg-[#7C5CFC] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)]">Save Address</button>
            </div>
          </div>
        </>
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
                <StepTracker currentStep={2} />
              </div>
              <div className="justify-self-end" />
            </div>
          </div>

          {/* Main card: Address Selection */}
          <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-6">
            <div className="border-2 border-blue-400 rounded-3xl bg-white shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-gray-900">Select Address</h2>
                <button type="button" onClick={()=>setstep(0)} className="inline-flex items-center gap-2 text-[#7C5CFC] font-medium">
                  <Plus className="w-5 h-5" />
                  <span>Add Address</span>
                </button>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <p className="text-[14px] text-[#6F6C90] font-medium mb-4">Default Address</p>
                
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={()=>setSelected(v=>!v)}
                      aria-pressed={selected}
                      className={`mt-1 w-5 h-5 rounded-full border-2 grid place-items-center ${selected ? 'border-[#7C5CFC]' : 'border-gray-300'}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${selected ? 'bg-[#7C5CFC]' : 'bg-transparent'}`} />
                    </button>
                    <div>
                      <p className="text-gray-900 font-semibold text-[16px]">HOME</p>
                      <p className="text-gray-600 text-[14px] mt-1 leading-relaxed">
                        {addressInfo.houseNo || '2235 California Street'} {addressInfo.road || 'Mountain View'}<br />
                        {addressInfo.cityState || 'California'} {addressInfo.zipCode || 'APT#021 - 11023'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
              <button type="button" className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
              <button onClick={HandleClick} type="button" disabled={!selected} className={`inline-flex items-center justify-center h-12 px-10 rounded-xl font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)] ${selected ? 'bg-[#7C5CFC] text-white hover:bg-[#6B4EE6]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Complete Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddAddress