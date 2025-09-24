import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Trash2, Plus } from 'lucide-react'
import axios from 'axios'
import { useEffect } from 'react'
import Navlogoname from '../../components/Navlogoname'
import { useSetRecoilState } from 'recoil'
import { LoadingStateApi } from '../../store/Loading.State'

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const order = location.state?.order || {}
  console.log(order);

 
  // simple currency helper
  const currency = (n = 0, symbol = '₹') => `${symbol}${Number(n || 0)}`

  const itemTotal = order?.lab?.price 
  const discount = 100
  const grandTotal = itemTotal - discount

 
  const SetLoading = useSetRecoilState(LoadingStateApi)

 async function handlePayment() {
  SetLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/create-order` ,{orderId:order._id} , {withCredentials:true})
        console.log(response)

    const { keyId, razorpayOrderId, amount, currency } = response.data.data
        const options ={
          key:keyId,
          amount,
          currency,
          order_id: razorpayOrderId,
          name:"zemoso diagnostic",
          description:"Lab Test Payment",
          handler:async function (response) {
          try {
            SetLoading(true)
      console.log("Razorpay response:", response);

      const verifyRes = await axios.post(
       `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/verify`,
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          orderId: order._id
        },
        { withCredentials: true }
      );

      console.log("Verify payment response:", verifyRes.data);

    const paymentStatus = verifyRes?.data?.data?.order?.paymentStatus
    const orderId = verifyRes?.data?.data?.order?._id
if (paymentStatus === "SUCCESS" ||
    verifyRes?.data?.message?.toLowerCase().includes("payment verified")) {
  navigate(`/payment-success/${orderId}`)
} else {
  // fallback: still navigate or show alert
  alert("Payment verification failed (status: " + paymentStatus + ").")
}

    } catch (error) {
      console.error("Payment verification error:", error);
      alert("Something went wrong during verification.");
    }finally{
      SetLoading(false)
    }
  },
           modal: {
        ondismiss: function () {
          // User closed the modal
          console.log("Checkout closed");
        }
      }
    };   
      const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header (reduced spacing & inline title) */}
      <Navlogoname/>
      <div className="max-w-3xl mx-auto w-full px-4 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-[#7C5CFC] hover:opacity-80" type="button">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>
          <span className="text-base font-semibold text-gray-900 leading-none">Checkout</span>
        </div>
      </div>
      {/* Main Card (unified, centered) */}
      <div className="max-w-3xl mx-auto px-4 mt-5">
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_-24px_rgba(17,24,39,0.12)] p-5 md:p-6 space-y-5">
          {/* Lab header */}
          <div className="rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gray-200 grid place-items-center overflow-hidden">
              <img src={order?.lab?.image} alt="" className="object-cover w-full h-full" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-gray-900 leading-tight">{order?.lab?.name}</h2>
          </div>
          {/* Pricing summary */}
            <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Item Total</span>
                <span className="text-gray-900 font-medium">{currency(itemTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600 font-medium">-{currency(discount)}</span>
              </div>
              <div className="border-t pt-3 flex items-center justify-between text-sm">
                <span className="text-gray-900 font-semibold">Grand Total</span>
                <span className="text-gray-900 font-bold">{currency(grandTotal)}</span>
              </div>
            </div>
          {/* Patient details */}
          <div className="rounded-2xl border border-gray-200">
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none"><path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
              <span className="text-gray-600 font-medium text-sm">Patient Details (1)</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{order?.patient?.name || 'Patrick Smith'}</span>
                <div className="flex items-center text-[11px] text-gray-500">
                  <span>{order?.patient?.bookingforWhom || 'Self'}</span>
                  <span className="mx-2 w-px h-4 bg-gray-200" />
                  <span>{order?.patient?.gender?.[0] || 'M'}</span>
                  <span className="mx-2 w-px h-4 bg-gray-200" />
                  <span>{order?.patient?.age || 30}</span>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900 font-medium text-sm leading-tight">{order?.test?.name || 'COVID RT-PCR Test'}</p>
                    <p className="text-xs text-gray-600">1 Test</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{currency(order?.test?.price || itemTotal)}</span>
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-2">E-Reports by 12hrs</p>
              </div>
            </div>
          </div>
          {/* Time Slot */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium text-sm">Time Slot Selected</span>
              </div>
              <button className="text-[#647FBC] font-medium text-sm hover:underline">Change</button>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {order?.slot?.date ? new Date(order.slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Tue, Feb 23, 2022'}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">
              {order?.slot?.startTime && order?.slot?.endTime ? `${order.slot.startTime} - ${order.slot.endTime}` : '07.00 - 08.00 AM'}
            </div>
          </div>
          {/* Address */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium text-sm">Address Selected (Home)</span>
              </div>
              <button className="text-[#647FBC] font-medium text-sm hover:underline">Change</button>
            </div>
            <div className="text-sm text-gray-900 leading-snug">
              <p>{order?.address?.houseNo || '2235 California Street'} {order?.address?.road || ''}</p>
              <p>{order?.address?.cityState || 'Mountain View, CA'} {order?.address?.zipCode || '94016'}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(17,24,39,0.12)]">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)} className="h-12 px-2 text-red-500 font-medium hover:text-red-600">Cancel</button>
          <button onClick={handlePayment} type="button" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#647FBC] text-white font-semibold shadow-[0_10px_20px_-6px_rgba(124,92,252,0.55)] hover:bg-[#647FBC]">Pay Now</button>
        </div>
      </div>
    </div>
  )
}