import React, { useEffect, useState } from 'react'
import StepTracker from '../../components/StepTracker'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { User, Calendar, MapPin, Trash2 } from 'lucide-react'
import Navlogoname from '../../components/Navlogoname'

function ReviewOrder() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [orderInfo, setOrderInfo] = useState(null)

  useEffect(() => {
    const fetchReviewOrder = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/order/${orderId}`, { withCredentials: true })
        setOrderInfo(response?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReviewOrder()
  }, [orderId])

  if (!orderInfo) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>

  const formatSlotDate = (val) => {
    if (!val) return ''
    return new Date(val).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    })
  }
  const timeToBlock = (t) => {
    if (!t) return ''
    const parts = t.toLowerCase().split(/\s+/) // ['7:00','am']
    const hm = (parts[0] || '').split(':')
    let h = parseInt(hm[0] || '0', 10)
    const m = hm[1] || '00'
    const ap = parts[1] || 'am'
    const hh = String(h).padStart(2, '0')
    return `${hh}.${m.padStart(2, '0')} ${ap.toUpperCase()}`
  }
  const timeRangeDisplay = () => {
    const st = orderInfo?.slot?.startTime || ''
    const et = orderInfo?.slot?.endTime || ''
    if (!st || !et) return ''
    // we want: 07.00 - 08.00 AM (show AM/PM only once at end)
    const partsS = st.toLowerCase().split(/\s+/)
    const partsE = et.toLowerCase().split(/\s+/)
    const hs = String(parseInt(partsS[0].split(':')[0] || '0', 10)).padStart(2, '0')
    const ms = (partsS[0].split(':')[1] || '00').padStart(2, '0')
    const he = String(parseInt(partsE[0].split(':')[0] || '0', 10)).padStart(2, '0')
    const me = (partsE[0].split(':')[1] || '00').padStart(2, '0')
    const ap = (partsE[1] || partsS[1] || 'am').toUpperCase()
    return `${hs}.${ms} - ${he}.${me} ${ap}`
  }

  const total = orderInfo?.lab?.price || 0
  const discount = 100 // placeholder static
  const grandTotal = total - discount
  
  const patients = Array.isArray(orderInfo?.patients)
    ? orderInfo.patients
    : Array.isArray(orderInfo?.patient)
      ? orderInfo.patient
      : orderInfo?.patient
        ? [orderInfo.patient]
        : []
  const patientCount = patients.length
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navlogoname/>
      {/* Step Tracker */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4 flex justify-center">
        <StepTracker currentStep={3} />
      </div>
      {/* Main Unified Card (reduced paddings & spacing) */}
      <div className="max-w-3xl mx-auto px-4 mt-5">
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_-24px_rgba(17,24,39,0.12)] p-5 md:p-6 space-y-6">
          {/* Lab + Pricing Summary */}
          <div className="space-y-5">
            {/* Lab Header */}
            <div className="rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                <img src={orderInfo?.lab?.image} alt="Lab" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-base md:text-lg font-semibold text-gray-900 leading-tight">{orderInfo?.lab?.name}</h2>
            </div>
            {/* Pricing Summary */}
            <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Item Total</span>
                <span className="text-gray-900 font-medium">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600 font-medium">-₹{discount}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-gray-900 font-semibold">Grand Total</span>
                <span className="text-gray-900 font-bold">₹{grandTotal}</span>
              </div>
            </div>
          </div>
          {/* Patient Details */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium text-sm">Patient Details ({patientCount})</span>
            </div>
            <div className="space-y-4">
              {patients.map((patient, index) => (
                <div key={index} className="rounded-xl border border-gray-200 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm leading-tight">{patient?.name}</p>
                      <p className="text-xs text-gray-600">1 Test</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">₹{orderInfo?.test?.price}</span>
                      <Trash2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-medium">E-Reports by 12hrs</p>
                </div>
              ))}
            </div>
          </div>
          {/* Time Slot Selected */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium text-sm">Time Slot Selected</span>
              </div>
              <button className="text-[#647FBC] font-medium text-sm hover:underline">Change</button>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-900 font-medium">
              <span>{formatSlotDate(orderInfo?.slot?.date)}</span>
              <span className="w-px h-4 bg-gray-300" />
              <span>{timeRangeDisplay()}</span>
            </div>
          </div>
          {/* Address Selected */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium text-sm">Address Selected (Home)</span>
              </div>
              <button className="text-[#647FBC] font-medium text-sm hover:underline">Change</button>
            </div>
            <div className="text-gray-900 text-sm leading-snug">
              <p>{orderInfo?.address?.houseNo} {orderInfo?.address?.road}</p>
              <p>{orderInfo?.address?.cityState} {orderInfo?.address?.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Footer (unchanged layout) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
          <button onClick={() => navigate('/checkout', { state: { order: orderInfo } })} className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#647FBC] text-white font-semibold shadow-[0_10px_20px_-6px_rgba(124,92,252,0.55)] hover:bg-[#647FBC]">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default ReviewOrder