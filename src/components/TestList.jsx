import React from 'react'
import {  useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'

function TestList() {
    const TestData = useRecoilValue(apiDataState)
    console.log(TestData);
    
  return (
    <><h1>Tests You Can Choose From</h1>
    <div className='grid grid-cols-3'>
        {TestData.slice(0,3).map((item , i )=>(
            <div key={i} className='flex'>
            <img src={item.image} alt=""  />
           <div>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.testsIncluded}</p>
            <p>{item.reportTime}</p>
            <p>View Details</p>
           </div>
            </div>
        ))}

    </div>
    </>
  )
}

export default TestList