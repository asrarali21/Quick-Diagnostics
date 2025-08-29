import React, { useEffect, useRef, useState } from 'react'

function VerifyOtp() {
  const PRIMARY = '#6B4DE0'
  const [otp, setOtp] = useState(['', '', '', ''])
  const refs = useRef([])

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const handleChange = (i) => (e) => {
    const val = e.target.value.replace(/\D/g, '')
    const next = [...otp]
    next[i] = val.slice(-1) || ''
    setOtp(next)
    if (val && i < refs.current.length - 1) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i) => (e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus()
      const next = [...otp]
      next[i - 1] = ''
      setOtp(next)
    }
  }

  const handlePaste = (i) => (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!text) return
    e.preventDefault()
    const next = [...otp]
    for (let k = 0; k < 4; k++) {
      const idx = i + k
      if (idx < 4) next[idx] = text[k] || ''
    }
    setOtp(next)
    const last = Math.min(i + text.length, 3)
    refs.current[last]?.focus()


    useEffect(()=>{
      
    } ,[])



  }
  return (
    <div className="min-h-screen bg-[#F8F5FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 px-8 py-10">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7E0FF] text-[#6B4DE0] text-sm font-semibold">Z</span>
            <span className="text-sm font-medium text-[#6B4DE0]">Zemoso Diagnostics</span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-gray-800">Hey Patrick</h1>
            <p className="text-gray-500 mt-1">Enter the OTP to verify your details</p>
          </div>

          {/* OTP Label */}
          <label className="block text-sm text-gray-600 mb-3">OTP</label>

          {/* OTP Inputs (underlined, auto-advance) */}
          <div className="flex items-center gap-8 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-10">
                <div className="border-b border-gray-300 focus-within:border-[#6B4DE0]">
                  <input
                    ref={(el) => (refs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    aria-label={`OTP digit ${i + 1}`}
                    autoComplete="one-time-code"
                    className="w-full text-center bg-transparent outline-none border-none py-1 text-gray-800"
                    value={otp[i]}
                    onChange={handleChange(i)}
                    onKeyDown={handleKeyDown(i)}
                    onPaste={handlePaste(i)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="button"
            className="w-full rounded-lg bg-[#6B4DE0] text-white font-semibold py-3"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp
