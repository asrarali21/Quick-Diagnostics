import React from 'react'
import { useRecoilValue } from 'recoil'
import { TestimonialDataState } from '../store/Testimonial.state';

function Testimonial() {
  const Testimonialdata = useRecoilValue(TestimonialDataState)
  console.log(Testimonialdata);

  return (
    <div className='bg-[#647FBC] py-16'>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        <h1 style={{ marginBottom: "25px", fontSize: "25px" }} className="text-2xl md:text-3xl font-semibold  mb-32 text-white">Customer Testimonials</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center'>
          {(Testimonialdata || []).map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-start w-full max-w-sm">
              <div className="flex items-center mb-3">
                <img src={item.image} alt="" className="w-10 h-10 rounded-full mr-3 object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">{item.name}</p>
                  <p className="text-sm text-gray-500 leading-tight">{item.location}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial