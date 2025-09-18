import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Check, UserSquare2, Package, FlaskConical, FileText, ChevronUp, ChevronDown, User, Info } from 'lucide-react'

function TrackOrder() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [orderInfo, setOrderInfo] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/order/${orderId}`, { withCredentials: true })
        setOrderInfo(response?.data?.data)
      } catch (error) {
        console.error('Failed to fetch order', error)
      }
    }
    fetchDetails()
  }, [orderId])

  // Helpers
  const formatDateTime = (iso) => {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      const date = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
      const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      return `${date}, ${time}`
    } catch {
      return ''
    }
  }

  const statusOrder = ['placed', 'assigned', 'collection', 'examining', 'completed']
  const currentStatus = orderInfo?.status || 'placed'
  const currentIndex = statusOrder.indexOf(currentStatus)

  const steps = [
    {
      key: 'placed',
      title: 'Order placed',
      subtitle: orderInfo?.createdAt ? `Placed on ${formatDateTime(orderInfo.createdAt)}` : '',
      icon: Check,
    },
    {
      key: 'assigned',
      title: 'Lab technician assigned',
      subtitle: orderInfo?.assignedAt ? formatDateTime(orderInfo.assignedAt) : '',
      extra: orderInfo?.labTechnician?.name || '',
      icon: UserSquare2,
    },
    {
      key: 'collection',
      title: 'Sample collection',
      subtitle: orderInfo?.collectionSlot ? `On ${formatDateTime(orderInfo.collectionSlot)}` : '',
      icon: Package,
    },
    {
      key: 'examining',
      title: 'Sample being examined',
      subtitle: 'Estimated time – 24 hrs',
      icon: FlaskConical,
    },
    {
      key: 'completed',
      title: 'Report ready',
      subtitle: orderInfo?.completedAt ? formatDateTime(orderInfo.completedAt) : '',
      icon: FileText,
    },
  ]

  const amountPaid = orderInfo?.amount || orderInfo?.payment?.total || 0
  const address = orderInfo?.address
  const addressCombined = [address?.houseNo, address?.road, address?.cityState, address?.zipCode].filter(Boolean).join(' ')

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <div className="max-w-7xl mx-auto px-10 pt-16 grid grid-cols-12 gap-14">
        {/* Left Column */}
        <div className="col-span-5">
          <div className="relative rounded-2xl bg-white shadow-[0_4px_32px_-4px_rgba(0,0,0,0.04)] ring-1 ring-black/5 p-6">
            {/* Top patient/test block */}
            <div className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-2.5">
                <User className="w-5 h-5 text-[#7C5CFC] mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-gray-900 leading-tight mb-0.5 truncate">{orderInfo?.patient?.name || 'Patrick Smith'}</p>
                  <p className="text-[13px] text-gray-500 leading-tight truncate">{orderInfo?.test?.testName || 'COVID RT-PCR TEST'}</p>
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
              <p className="text-[13px] text-gray-700 leading-snug mb-3 truncate">{addressCombined || '2235 California Street Mountain View California APT..'}</p>
              <p className="text-[13px] font-semibold text-gray-900">Total Amount Paid - ₹{amountPaid}</p>
            </div>
            {/* Instructions Box */}
            <div className="mt-5">
              <div className="bg-[#E3E2E7] rounded-md px-4 py-3">
                <button onClick={() => setShowInstructions(v=>!v)} className="w-full flex items-start justify-between text-left">
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-sm bg-[#6234F6]"><Info className="w-3 h-3 text-white" /></span>
                    <p className="text-[13px] font-medium text-[#4E2DB4]">Instructions</p>
                  </div>
                  {showInstructions ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {showInstructions && (
                  <p className="text-[13px] text-gray-700 leading-snug mt-2.5">
                    {orderInfo?.instructions || "Please don't eat or drink anything other than water for  8 -10 hours prior to the appointment."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider line (visual) */}
        <div className="col-span-1 flex justify-center">
          <div className="w-px bg-gray-200" />
        </div>

        {/* Right Column */}
        <div className="col-span-6">
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-10 h-full">
            <h2 className="text-[20px] font-semibold text-gray-900 mb-8">Track your order</h2>
            <ol className="relative">
              {steps.map((step, idx) => {
                const done = idx <= currentIndex
                const active = idx === currentIndex
                const Icon = step.icon
                return (
                  <li key={step.key} className="relative pb-10 last:pb-0">
                    {/* Connector */}
                    {idx < steps.length - 1 && (
                      <span className={`absolute left-5 top-10 w-px h-full ${done ? 'bg-[#7C5CFC]' : 'bg-gray-200'}`} />
                    )}
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${done ? 'bg-[#7C5CFC] border-[#7C5CFC]' : active ? 'border-[#7C5CFC] bg-white' : 'border-gray-200 bg-white'}`}> 
                          {done && idx === 0 ? (
                            <Check className="w-6 h-6 text-white" />
                          ) : (
                            <Icon className={`${done || active ? 'text-[#7C5CFC]' : 'text-gray-400'} w-6 h-6`} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className={`text-[15px] font-medium ${done ? 'text-gray-900' : 'text-gray-700'}`}>{step.title}</p>
                        {step.subtitle && <p className="text-[13px] text-gray-500 leading-tight mt-0.5">{step.subtitle}</p>}
                        {step.extra && (
                          <span className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-md bg-gray-100 text-[12px] text-gray-700">
                            <span className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center ring-1 ring-gray-200 text-[10px] font-medium text-gray-600">
                              {(step.extra[0] || 'E').toUpperCase()}
                            </span>
                            {step.extra}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 py-4 px-10 flex justify-end">
        <button
          onClick={() => navigate('/home')}
          className="px-8 py-3 rounded-md bg-[#6344F5] hover:bg-[#5837f3] text-white text-sm font-medium shadow-sm transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default TrackOrder
