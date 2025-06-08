import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
function TestInfo() {
  const navigate = useNavigate()
    const {id} =useParams()
     const TestInfoList =  useRecoilValue(apiDataState)
     const test = TestInfoList.find(t => String(t.id) === id)
     console.log(test);
     
     
  return (
    <div>
      <h2>{test.name}</h2>
     <button onClick={()=>navigate("/")}>Back</button>
    </div>
  )
}

export default TestInfo