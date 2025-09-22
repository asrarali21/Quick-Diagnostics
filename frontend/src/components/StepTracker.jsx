import React from 'react'
import { useNavigate } from 'react-router-dom'

function StepTracker({ currentStep = 0, onStepClick }) {
  const navigate = useNavigate()
  const steps = ['Lab test', 'Select appointment', 'Add address', 'Review order']

  return (
    <div className="w-full py-2">
      <div className="flex items-center text-sm sm:text-base flex-nowrap overflow-x-auto">
        {/* Back control with purple arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 pr-8 text-[#647FBC] hover:text-[#7287b9] font-medium focus:outline-none flex-shrink-0 whitespace-nowrap"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        {/* Steps */}
        {steps.map((label, i) => {
          const isActive = i === currentStep
          const isClickable = i < currentStep
          const textCls = isActive
            ? 'text-[#1F1B2D] font-semibold'
            : 'text-gray-500'
          return (
            <React.Fragment key={label}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => {
                  if (isClickable) {
                    if (onStepClick) onStepClick(i)
                    else navigate(-1)
                  }
                }}
                className={`px-0 disabled:cursor-default focus:outline-none flex-shrink-0 whitespace-nowrap ${textCls}`}
              >
                {label}
              </button>
              {i < steps.length - 1 && (
                <span className="mx-8 h-px w-24 bg-gray-300 inline-block flex-shrink-0" aria-hidden="true" />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default StepTracker