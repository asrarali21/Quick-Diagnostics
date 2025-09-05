import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { TestdataApiState } from '../store/test.state'
import { orderState } from '../store/order.state'
import { CloudUpload } from 'lucide-react'

function BreadCrum() {
  const { id } = useParams()
  const location = useLocation() // ye pura path deta 
  console.log(location);
  
  const segments = location.pathname.split('/').filter(Boolean) //ye split karta whenver "/" ["testinfo","123"] or ["AddPatient"]
  const testList = useRecoilValue(TestdataApiState)
  const order = useRecoilValue(orderState)
  const navigate = useNavigate()

  // 1) Determine effective test id (from URL, nav state, or Recoil)
  const stateTest = location.state?.Test || location.state?.test // id or object
  console.log("state test ", stateTest);
  
  const stateTestId = typeof stateTest === 'string' ? stateTest : stateTest?._id
  const effectiveTestId = id || stateTestId || order?.test

  // 2) Resolve test object
  const fromList = Array.isArray(testList)
    ? testList.find((t) => String(t?._id) === String(effectiveTestId))
    : undefined
  const testObj = fromList || (typeof stateTest === 'object' ? stateTest : undefined)
  const testTitle = testObj?.testName || testObj?.name || 'Test'

  // 3) Current page label from route
  const routeKey = segments[segments.length - 1]
  console.log("route",routeKey);
  
  const prevKey = segments[segments.length - 2]
  console.log(prevKey);
  

  // Only show breadcrumb on TestInfo (/testinfo/:id) and AddPatient
  const isTestInfo = routeKey === 'testinfo' || prevKey === 'testinfo'
  const isAddPatient = routeKey === 'AddPatient'
  if (!isTestInfo && !isAddPatient) return null

  const pageMap = {
    AddPatient: 'Add Patient',
  }
  let currentLabel = pageMap[routeKey]
  console.log(currentLabel);
  
  if (!currentLabel) {
    if (prevKey === 'testinfo') currentLabel = testTitle
    else currentLabel = decodeURIComponent(routeKey || '') || 'Details'
  }

  // On AddPatient, show Home — Test — Add Patient. On TestInfo, show Home — Test only.
  const showMiddle = isAddPatient

  
  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-4xl">
      <div className="flex items-center text-[16px] leading-6 text-[#6F6C90]">
        <Link
          to="/home"
          className="no-underline hover:text-[#7C5CFC] transition-colors"
          style={{ color:"#5A5766" , textDecoration: 'none' }}
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