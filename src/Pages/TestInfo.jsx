import React from 'react'
import { useParams } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
function TestInfo() {
    const {id} =useParams()
     const TestInfoList =  useRecoilValue(apiDataState)
     const test = TestInfoList.find(t => String(t.id) === id)
     console.log(test);
     
     
  return (
    <div>
      <h2>{test.name}</h2>
     
    </div>
  )
}

export default TestInfo