import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ArrowLeft, Clock, DollarSign } from 'lucide-react'

import BreadCrum from '../../components/BreadCrum'
import { SingletestInfo } from '../../store/test.state'

import doctorImg from '../../assets/TestInfoAssets/doctor.svg'
import homeImg from '../../assets/TestInfoAssets/home.svg'
import reportsImg from '../../assets/TestInfoAssets/reports.svg'
import testImg from '../../assets/TestInfoAssets/test.svg'

function TestInfo() {
  const navigate = useNavigate()
  const { id } = useParams()
  const Test = useRecoilValue(SingletestInfo(id))

  const title = Test?.testName || Test?.name || 'Covid RTPCR Test'
  const price = Test?.price ?? 1200
  const reportTime = Test?.report_time || '24 Hours'



  const featureItems = [
    { icon: homeImg, label: 'Home\nvisit' },
    { icon: testImg, label: '1 test\nincluded' },
    { icon: doctorImg, label: 'Free\nconsultation' },
    { icon: reportsImg, label: 'Online\nreports' },
  ]

  const descriptionFirst = Test?.description ? String(Test.description) : null

  const disclaimers = Array.isArray(Test?.disclaimers)
    ? Test.disclaimers
    : Test?.disclaimers
    ? String(Test.disclaimers)
        .split(/\n|\r|\.|;|\u2022/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  const bullets = [
    ...(descriptionFirst ? [descriptionFirst] : []),
    ...disclaimers,
  ]

  const whyBook = Array.isArray(Test?.why_book)
    ? Test.why_book
    : Test?.why_book
    ? String(Test.why_book)
        .split(/\n|\r|\u2022|\|/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        'To check if you have an active COVID-19 infection',
        'If you are showing symptoms of COVID-19 infection',
        'If you had a contact with someone with confirmed COVID-19',
      ]

  const currency = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="min-h-screen relative pb-24">
      {/* Header row: Back (left) + Breadcrumb (center) */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-[#7C5CFC] hover:opacity-80"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
          <div className="justify-self-center w-full max-w-md">
            <BreadCrum />
          </div>
          <div className="justify-self-end" />
        </div>
      </div>

      {/* Main card */}
      <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.15)] p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-[28px] leading-9 font-semibold text-gray-900">{title}</h1>

          {/* Feature badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featureItems.map((f, idx) => (
              <div key={idx} className="bg-[#F6F1FF] h-[72px] rounded-2xl px-4 flex items-center">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#F1EAFE] grid place-items-center">
                    <img src={f.icon} alt="" className="w-6 h-6 object-contain" />
                  </span>
                  <span className="text-[14px] leading-[18px] font-medium text-[#6F6C90] whitespace-pre-line">
                    {f.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Price / Time pill */}
          <div className="mt-6">
            <div className="inline-flex items-center gap-4 border border-gray-200 rounded-full px-4 py-2">
              <span className="inline-flex items-center gap-2 text-gray-700">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-[14px] font-medium">Starting from {currency(price)}</span>
              </span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <span className="inline-flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-[14px] font-medium">Reports ready in {reportTime}</span>
              </span>
            </div>
          </div>

          {/* Bullet points */}
          <ul className="mt-6 list-disc pl-5 space-y-3 text-[14px] leading-6 text-gray-700">
            {bullets.length > 0 ? (
              bullets.map((b, i) => <li key={i}>{b}</li>)
            ) : (
              <li>This package covers nasal/oral swab test & same day pickup. It indicates if you currently have the COVID-19 infection.</li>
            )}
          </ul>

          {/* Why book section */}
          <h3 className="mt-8 text-gray-900 font-semibold text-[18px]">Why you should book this package?</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {whyBook.slice(0, 3).map((text, i) => (
              <div key={i} className="bg-[#F6F1FF] rounded-2xl px-5 py-4 text-[14px] leading-6 text-[#6F6C90]">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)} className="text-red-500 font-medium">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => navigate('/AddPatient', { state: { Test } })}
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#7C5CFC] text-white font-semibold shadow-[0_12px_24px_-8px_rgba(124,92,252,0.6)] hover:opacity-95"
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestInfo