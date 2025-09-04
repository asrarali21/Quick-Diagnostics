import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { TestdataApiState } from '../store/test.state'
import { orderState } from '../store/order.state'

function BreadCrum() {
  const { id } = useParams()
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean) // ["testinfo","123"] or ["AddPatient"]
  const testList = useRecoilValue(TestdataApiState)
  const order = useRecoilValue(orderState)
  const navigate = useNavigate()

  // 1) Determine effective test id (from URL, nav state, or Recoil)
  const stateTest = location.state?.Test || location.state?.test // id or object
  const stateTestId = typeof stateTest === 'string' ? stateTest : stateTest?._id
  const effectiveTestId = id || stateTestId || order?.test

  // 2) Resolve test object
  const fromList = Array.isArray(testList)
    ? testList.find((t) => String(t?._id ?? t?.id) === String(effectiveTestId))
    : undefined
  const testObj = fromList || (typeof stateTest === 'object' ? stateTest : undefined)
  const testTitle = testObj?.testName || testObj?.name || 'Test'

  // 3) Current page label from route
  const routeKey = segments[segments.length - 1]
  const prevKey = segments[segments.length - 2]
  const pageMap = {
    AddPatient: 'Add Patient',
    Lab: 'Select Lab',
    SelectAppointment: 'Select Appointment',
    AddAddress: 'Add Address',
    reviewOrder: 'Review Order',
  }
  let currentLabel = pageMap[routeKey]
  if (!currentLabel) {
    // For /testinfo/:id show just the test name as current
    if (prevKey === 'testinfo') currentLabel = testTitle
    else currentLabel = decodeURIComponent(routeKey || '') || 'Details'
  }

  // 4) Decide whether to include the middle segment (test title)
  const showMiddle = routeKey !== 'testinfo' && prevKey !== 'testinfo' // on testinfo page we only show Home — Test

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-4xl">
      <div className="flex items-center text-[16px] leading-6 text-[#6F6C90]">
        <Link
          to="/home"
          className="no-underline hover:text-[#7C5CFC] transition-colors"
          style={{ textDecoration: 'none' }}
        >
          Home
        </Link>
        {/* separator line */}
        <span className="mx-4 h-px bg-gray-300 w-24 sm:w-32" />
        <span className="truncate">
          {testTitle}
        </span>
        {showMiddle && (
          <>
            <span className="mx-4 h-px bg-gray-300 w-24 sm:w-32" />
            <span className="text-gray-900 font-semibold truncate">{currentLabel}</span>
          </>
        )}
        {!showMiddle && (
          <span className="sr-only">Current: {currentLabel}</span>
        )}
      </div>
    </nav>
  )
}

export default BreadCrum