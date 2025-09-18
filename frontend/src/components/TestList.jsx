import React from 'react'
import { useNavigate } from 'react-router-dom'

import bodyTestImg from '../assets/bodytest.svg'
import cardiacImg from '../assets/cardiac.svg'
import stressImg from '../assets/stress.svg'

function TestList() {
  const navigate = useNavigate()

  const tests = [
    {
      key: 'full-body',
      name: 'Full body checkup',
      price: 1299,
      reportTime: '24 Hrs',
      testCount: 42,
      image: bodyTestImg,
      alt: 'Full body checkup'
    },
    {
      key: 'cardiac',
      name: 'Cardiac Risk Assessment',
      price: 1299,
      reportTime: '24 Hrs',
      testCount: 42,
      image: cardiacImg,
      alt: 'Cardiac risk assessment'
    },
    {
      key: 'stress',
      name: 'Stress Assessment',
      price: 1299,
      reportTime: '24 Hrs',
      testCount: 42,
      image: stressImg,
      alt: 'Stress assessment'
    }
  ]

  const currency = (n) => `₹${Number(n || 0)}`

  return (
    <section className="w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[26px] md:text-[30px] font-semibold text-gray-900 leading-snug decoration-[#1F2840]">
            Tests You Can Choose From
          </h2>
        </div>
        {/* Cards Row */}
        <div className="grid gap-6 md:grid-cols-3">
          {tests.map(t => (
            <div
              key={t.key}
              className="relative flex rounded-2xl border border-[#F1EAFE] bg-white px-4 py-4 md:px-5 md:py-5 hover:shadow-[0_8px_28px_-14px_rgba(124,92,252,0.25)] transition-shadow"
              style={{ minHeight: 170 }}
            >
              {/* Image */}
              <div className="shrink-0 mr-5 md:mr-6">
                <div className="w-[158px] h-[160px] rounded-lg bg-[#F5F1FF] flex items-center justify-center overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="w-full h-full object-contain p-3 select-none"
                    draggable="false"
                  />
                </div>
              </div>
              {/* Text (aligned stack) */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-col flex-1 justify-start">
                  <button
                    type="button"
                    onClick={""}
                    className="text-left font-semibold text-[17px] leading-snug text-gray-900 underline underline-offset-[3px] decoration-transparent hover:decoration-[#5B3AE6] transition-colors"
                  >
                    {t.name}
                  </button>
                  <p className="text-[15px] font-medium text-gray-900 tracking-tight mt-2">
                    Starting from {currency(t.price)}
                  </p>
                  <p className="text-[13px] text-gray-600 mt-2">
                    Reports ready in {t.reportTime}
                  </p>
                  <p className="text-[13px] text-gray-600 mt-2">
                    {t.testCount} tests
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestList