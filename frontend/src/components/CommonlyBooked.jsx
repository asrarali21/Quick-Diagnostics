import React from 'react'
import { useRecoilValue } from 'recoil'
import { ChevronsRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TestdataApiState } from '../store/test.state'
import GlobalSpinner from './GlobalSpinner'
import { LoadingStateApi } from '../store/Loading.State'

function CommonlyBooked() {
  const tests = useRecoilValue(TestdataApiState)
    const loading = useRecoilValue(LoadingStateApi);
  const navigate = useNavigate()



  if (loading) {
    return <GlobalSpinner />;
    // Or: return <div>Loading...</div>;
  }

  const handleClick = (id) => navigate(`/testinfo/${id}`)

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-8 items-center justify-between mt-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Tests You Can Choose From</h2>
        {/* <button type="button" className="text-[#647FBC] font-medium flex items-center gap-1 hover:underline">
          See more <ChevronsRight className="w-5 h-5" />
        </button> */}
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tests.map((item, i) => (
            <div
              key={item?._id}
              role="button"
              onClick={() => handleClick(item?._id)}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl border border-[#F1EAFE] shadow-[0_12px_30px_-12px_rgba(124,92,252,0.25)] p-8 flex flex-col items-center justify-center min-h-[140px]">
                <div className="h-14 w-14 rounded-xl bg-[#F2F2F2] grid place-items-center mb-3">
                  <img src={item.icon} alt="" className="h-7 w-7 object-contain" />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">{item.testName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CommonlyBooked