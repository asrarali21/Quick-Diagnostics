import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { TestdataApiState } from '../store/test.state'

function BreadCrum() {
  const { id } = useParams()
  const location = useLocation()
  const pathnames = location.pathname.split('/')
  const testList = useRecoilValue(TestdataApiState)
  const navigate = useNavigate()

  // Prefer match on _id, fallback to id; also allow state.Test or state.test
  const fromList = Array.isArray(testList)
    ? testList.find((t) => String(t?._id ?? t?.id) === String(id))
    : undefined
  const fromState = location.state?.Test || location.state?.test
  const tests = fromList || fromState

  const current = tests?.testName || tests?.name || decodeURIComponent(pathnames[pathnames.length - 1] || '') || 'Details'

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-3xl">
      <div className="flex items-center text-[14px] leading-6">
        <Link
          to="/"
          className="no-underline text-black visited:text-black hover:text-black active:text-black focus:text-black"
          style={{ color: '#000', textDecoration: 'none' }}
        >
          Home
        </Link>
        {/* Track line */}
        <span className="mx-3 h-px bg-gray-300 flex-1" />
        <span className="text-gray-900 font-bold">{current}</span>
      </div>
    </nav>
  )
}

export default BreadCrum