import React, { useEffect, useState } from 'react'
import StepTracker from '../../components/StepTracker'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { User, Calendar, MapPin, Trash2 } from 'lucide-react'

function ReviewOrder() {
  const navigate = useNavigate()
  const {orderId} = useParams()
  const [orderInfo, setOrderInfo] = useState(null)

  useEffect(() => {
    const fetchReviewOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/order/${orderId}`, {withCredentials:true})
        console.log(response);
        setOrderInfo(response?.data?.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviewOrder()
  }, [orderId])

  if (!orderInfo) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
       <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4">
    <StepTracker currentStep={3}/>
      </div>


     

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Lab Header */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 font-bold">{orderInfo?.lab?.name?.charAt(0) || 'L'}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{orderInfo?.lab?.name}</h2>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white rounded-2xl p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Item Total</span>
              <span className="text-gray-900 font-medium">${orderInfo?.test?.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600 font-medium">-$100</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Grand Total</span>
                <span className="text-lg font-bold text-gray-900">${(orderInfo?.test?.price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Patient Details (1)</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">{orderInfo?.patient?.name}</span>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{orderInfo?.patient?.bookingforWhom}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{orderInfo?.patient?.gender?.charAt(0) }</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{orderInfo?.patient?.age }</span>
              </div>
            </div>
            
            <div className="border-l-4 border-gray-200 pl-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{orderInfo?.test?.name }</p>
                  <p className="text-sm text-gray-600">1 Test</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">${orderInfo?.test?.price }</span>
                  <Trash2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">E-Reports by 12hrs</p>
            </div>
          </div>
        </div>

        {/* Time Slot */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Time Slot Selected</span>
            </div>
            <button className="text-[#7C5CFC] font-medium hover:underline">Change</button>
          </div>
          
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">
              {new Date(orderInfo?.slot?.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
            <p className="text-gray-600">
              {orderInfo?.slot?.startTime} - {orderInfo?.slot?.endTime}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Address Selected (Home)</span>
            </div>
            <button className="text-[#7C5CFC] font-medium hover:underline">Change</button>
          </div>
          
          <div className="text-gray-900">
            <p>
              {orderInfo?.address?.houseNo} {orderInfo?.address?.road}
            </p>
            <p>
              {orderInfo?.address?.cityState} {orderInfo?.address?.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="text-red-500 font-semibold text-lg hover:text-red-600"
          >
            Cancel
          </button>
          <button 
            onClick={() => {/* Handle continue */}}
            className="bg-[#7C5CFC] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#6B4EE6] shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewOrder