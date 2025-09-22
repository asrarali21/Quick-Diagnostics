import React, { useEffect, useState } from 'react'
import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { orderState } from '../../store/order.state'
import Navlogoname from '../../components/Navlogoname'

function SelectAppointment() {
  const navigate = useNavigate()
  const orders = useRecoilValue(orderState)

   

   const [order , setOrder ] = useRecoilState(orderState)
   console.log(order);


   
   
  const [appointmentInfo , setappointmentInfo] = useState([])
  console.log("appintment info",appointmentInfo);
  
  const [dates, setDates] = useState([])             // [{ymd:'2025-09-03', day:'Wed', dateNum:'23'}]
  const [selectedDate, setSelectedDate] = useState('')// 'YYYY-MM-DD'
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null) // index in current day's slots
  console.log();

   const selectedslot  = appointmentInfo?.[selectedSlotIndex]
      console.log("selected slot",selectedslot?._id);
  
    useEffect(() => {
  if (selectedslot?._id) {
    setOrder({
      ...order,
      slot: selectedslot._id
    })
  }
}, [selectedslot])

  // helpers
  const getYMD = (val) => {
    const d = new Date(val)
    const y = d.getUTCFullYear()
    const m = String(d.getUTCMonth() + 1).padStart(2, '0')
    const day = String(d.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  const getDayShort = (val) => {
    const d = new Date(val)
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    return days[d.getUTCDay()]
  }
  const getDateNum = (val) => {
    const d = new Date(val)
    return String(d.getUTCDate())
  }
  const to24hHour = (time12) => {
    // "1:00 pm" -> 13
    if (!time12) return 0
    const parts = time12.trim().toLowerCase().split(/\s+/) // ["1:00","pm"]
    const hm = parts[0]?.split(':') || []
    let h = parseInt(hm[0] || '0', 10)
    const ap = parts[1] || 'am'
    if (ap === 'pm' && h !== 12) h += 12
    if (ap === 'am' && h === 12) h = 0
    return h
  }
  const dot = (time12, padHour = true) => {
    // "1:00 pm" -> "01.00" (or "1.00" if padHour=false)
    const parts = time12.trim().toLowerCase().split(/\s+/)
    const [hStr, mStr = '00'] = (parts[0] || '0:00').split(':')
    let h = parseInt(hStr || '0', 10)
    const ap = parts[1] || 'am'
    if (ap === 'pm' && h !== 12) h += 12
    if (ap === 'am' && h === 12) h = 0
    let h12 = h % 12
    if (h12 === 0) h12 = 12
    const hh = padHour ? String(h12).padStart(2, '0') : String(h12)
    const mm = String(parseInt(mStr, 10)).padStart(2, '0')
    return `${hh}.${mm}`
  }
  const compactAmPm = (time12) => {
    // "1:00 pm" -> "1.00pm"
    const parts = time12.trim().toLowerCase().split(/\s+/)
    const ap = parts[1] || 'am'
    return `${dot(time12, false)}${ap}`
  }

  // fetch
  const todayDate = "2025-09-03"
  const fetchSlots = async () => {
    if (!order?.lab) return
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/slot/getslot`,
        { params:{ labId: orders.lab, date: todayDate } }
      )
      console.log(response);
    
      
      const list = Array.isArray(response.data?.data) ? response.data.data : []
      setappointmentInfo(list)

      // build unique dates for pills
      const uniq = []
      const seen = {}
      for (const item of list) {
        const ymd = getYMD(item.date)
        if (!seen[ymd]) {
          seen[ymd] = true
          uniq.push({
            ymd,
            day: getDayShort(item.date),
            dateNum: getDateNum(item.date)
          })
        }
      }
      setDates(uniq)
      if (uniq.length && !selectedDate) setSelectedDate(uniq[0].ymd)
      setSelectedSlotIndex(null)
    } catch (error) {
      console.log(error)
      setappointmentInfo([])
      setDates([])
      setSelectedSlotIndex(null)
    }
  }

  useEffect(() => { fetchSlots() }, []) // keep your original flow

  // slots for selected date (simple filter)
  const slotsForSelected = appointmentInfo.filter(
    (s) => getYMD(s.date) === selectedDate
  )

  // split into morning/afternoon (simple condition)
  const morningSlots = slotsForSelected.filter(
    (s) => {
      const h = to24hHour(s.startTime)
      return h >= 6 && h < 12
    }
  )
  const afternoonSlots = slotsForSelected.filter(
    (s) => {
      const h = to24hHour(s.startTime)
      return h >= 12 && h < 16
    }
  )

  // footer text
  let footerText = 'Select a time slot'
  const selectedDayObj = dates.find(d => d.ymd === selectedDate)
  if (selectedDayObj && selectedSlotIndex !== null && slotsForSelected[selectedSlotIndex]) {
    const s = slotsForSelected[selectedSlotIndex]
    footerText = `${selectedDayObj.day} ${selectedDayObj.dateNum}, ${compactAmPm(s.startTime)} - ${compactAmPm(s.endTime)}`
  }

  return (
    <div className="min-h-screen relative pb-24 bg-gray-50">
      <Navlogoname/>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4">
        <StepTracker currentStep={1}/>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.12)] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Appointment</h2>

          {/* Date pills (built only from fetched dates) */}
          <div className="flex items-center gap-3 mb-8">
            {dates.map((d) => (
              <button
                key={d.ymd}
                type="button"
                onClick={() => { setSelectedDate(d.ymd); setSelectedSlotIndex(null); }}
                className={[
                  'w-20 h-[72px] rounded-[36px] flex flex-col items-center justify-center border transition-colors',
                  d.ymd === selectedDate
                    ? 'bg-[#647FBC] text-white border-[#9E62B2]'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                ].join(' ')}
              >
                <span className="text-sm">{d.day}</span>
                <span className="text-xl font-semibold">{d.dateNum}</span>
              </button>
            ))}
          </div>

          {/* Morning block (only if admin created any) */}
          {morningSlots.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm sm:text-base text-gray-700 font-medium mb-3">06 AM - 12 AM</h3>
              <div className="grid grid-cols-2 gap-3">
                {morningSlots.map((s, idx) => {
                  const globalIndex = slotsForSelected.indexOf(s)
                  const selected = selectedSlotIndex === globalIndex
                  return (
                    <button
                      key={`${s._id}-m`}
                      type="button"
                      onClick={() => setSelectedSlotIndex(globalIndex)}
                      className={[
                        'h-12 rounded-[30px] text-sm font-medium transition-colors border px-4',
                        selected
                          ? 'bg-[#647FBC] text-white border-[#647FBC]'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-[#7C5CFC]/50'
                      ].join(' ')}
                    >
                      {`${dot(s.startTime)} - ${dot(s.endTime)}`}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Afternoon block (only if admin created any) */}
          {afternoonSlots.length > 0 && (
            <div className="mb-2">
              <h3 className="text-sm sm:text-base text-gray-700 font-medium mb-3">12 PM - 04 PM</h3>
              <div className="grid grid-cols-2 gap-3">
                {afternoonSlots.map((s) => {
                  const globalIndex = slotsForSelected.indexOf(s)
                  const selected = selectedSlotIndex === globalIndex
                  return (
                    <button
                      key={`${s._id}-a`}
                      type="button"
                      onClick={() => setSelectedSlotIndex(globalIndex)}
                      className={[
                        'h-12 rounded-[30px] text-sm font-medium transition-colors border px-4',
                        selected
                          ? 'bg-[#647FBC] text-white border-[#647FBC]'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-[#7C5CFC]/50'
                      ].join(' ')}
                    >
                      {`${dot(s.startTime)} - ${dot(s.endTime)}`}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky footer (exact style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" className="h-12 px-5 rounded-full text-red-500 font-medium hover:text-red-600" onClick={() => navigate(-1)}>Cancel</button>
          <div className="text-gray-700 font-medium">{footerText}</div>
          <button
            type="button"
            disabled={selectedSlotIndex === null}
            onClick={() => navigate('/AddAddress')}
            className={[
              'inline-flex items-center justify-center h-12 px-8 rounded-full font-semibold transition-colors',
              selectedSlotIndex !== null
                ? 'bg-[#647FBC] text-white shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)] hover:bg-[#7791cd]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ].join(' ')}
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectAppointment