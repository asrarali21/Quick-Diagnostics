import React from 'react'
import { useRecoilState } from 'recoil'
import { apiDataState } from '../apiState'

function TestList() {
    const TestData = useRecoilState(apiDataState)
    console.log(TestData);
    
  return (
    <div>
        {TestData.map((item , i )=>(
            <div key={i}>
            <img src={item.image} alt="" />
            </div>
        ))}

    </div>
  )
}

export default TestList