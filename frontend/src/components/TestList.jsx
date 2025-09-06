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

  const currency = (n) => `$${Number(n || 0)}`

  return (
    <section className="w-full mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading row */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[42px] leading-[1.1] font-semibold text-gray-900 tracking-tight">
            Tests You Can Choose From
          </h2>
          <button
            type="button"
            onClick={() => navigate(`/testinfo/${tests[0].key}`)}
            className="text-[#5B3AE6] font-medium text-sm sm:text-base hover:text-[#4528c9] inline-flex items-center gap-1"
          >
            See more <span className="text-lg">»»</span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {tests.map(t => (
            <div
              key={t.key}
              className="group bg-white border border-gray-200 rounded-[28px] shadow-[0_8px_28px_-12px_rgba(17,24,39,0.10)] hover:shadow-[0_14px_46px_-14px_rgba(17,24,39,0.18)] transition-all duration-300"
            >
              <div className="flex gap-6 p-6 h-full">
                {/* Illustration block */}
                <div className="w-40 shrink-0">
                  <div className="w-40 h-48 rounded-2xl bg-[#F5F1FF] flex items-center justify-center overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.alt}
                      className="w-full h-full object-contain p-3 select-none"
                      draggable="false"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-[18px] sm:text-[19px] font-semibold text-gray-900 leading-snug">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-gray-900">
                    Starting from {currency(t.price)}
                  </p>
                  <p className="mt-2 text-[13px] text-gray-600">
                    Reports ready in {t.reportTime}
                  </p>
                  <p className="mt-1 text-[13px] text-gray-600">
                    {t.testCount} tests
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate(`/testinfo/${t.key}`)}
                    className="mt-auto pt-4 text-[13px] font-semibold text-gray-900 underline underline-offset-2 decoration-gray-400 group-hover:text-[#5B3AE6] group-hover:decoration-[#5B3AE6] transition"
                  >
                    View Details
                  </button>
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