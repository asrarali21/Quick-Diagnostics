import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import successIllustration from '../../assets/paymentsuccess.png' // update path if different
import Navlogoname from '../../components/Navlogoname'

function PaymentSuccess() {
  const navigate = useNavigate()
  const { orderId } = useParams() || {}

  return (
    <div className="min-h-screen bg-white relative pb-28">
      <Navlogoname/>
      {/* Main content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
          
          {/* Illustration */}
            <div className="w-full lg:w-[560px] flex justify-center">
              <img
                src={successIllustration}
                alt="Payment Success"
                className="max-w-full h-auto select-none pointer-events-none"
                draggable="false"
              />
            </div>

          {/* Right panel */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_24px_60px_-28px_rgba(17,24,39,0.18)] border border-gray-100 p-8">
            <h1 className="text-[24px] sm:text-[26px] font-semibold text-gray-900">
              Your order has been placed
            </h1>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-[15px] font-semibold text-[#647FBC] flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#647FBC] text-[12px] font-bold text-white">
                    i
                  </span>
                  Instructions
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
                  Please don't eat or drink anything other than water for 8 -10 hours prior to the appointment.
                </p>
              </div>

              {orderId && (
                <div className="text-xs text-gray-400">
                  Order ID: <span className="font-mono">{orderId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-end gap-6">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="h-12 px-6 rounded-lg border border-[#647FBC] text-[#647FBC] font-medium hover:bg-[#F5F1FF] transition"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={() => navigate(`/trackOrder/${orderId}`)}
            className="h-12 px-8 rounded-lg bg-[#647FBC] hover:bg-[#50628d] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.55)] transition"
          >
            Track Your Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
