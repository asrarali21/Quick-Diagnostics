import React from 'react'

function Reports() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6B4DE0]/10 to-[#9E62B2]/10 ring-1 ring-[#6B4DE0]/20">
          {/* file icon */}
          <svg className="h-8 w-8 text-[#647FBC]" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H7a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7l-5-5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12h8M8 16h8M8 8h4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>

        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#2D2A38]">
          No reports yet
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#5A5766]">
          Your reports will appear here once they’re ready.
        </p>
      </div>
    </div>
  )
}

export default Reports