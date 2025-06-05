import React from 'react'
import { useRecoilValue } from 'recoil'
import { apiTestimonialState } from '../apiState'

function Testimonial() {
    const Testimonialdata = useRecoilValue(apiTestimonialState)
    console.log(Testimonialdata);
    
  return (
    <div className='bg-blue-600 h-[200px]'>
        <h1>Customer Testimonial</h1>
    <div className='grid grid-cols-3 border-2 '>
        {Testimonialdata.map((item ,i )=>(
            <div key={i}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.location}</p>
                <p >{item.message}</p>
            </div>
        ))}
        </div>

    </div>
  )
}

export default Testimonial