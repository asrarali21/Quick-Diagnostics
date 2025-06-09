import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
import BreadCrum from '../components/BreadCrum'
function TestInfo() {
  const navigate = useNavigate()
    const {id} =useParams()
     const TestInfoList =  useRecoilValue(apiDataState)
     const test = TestInfoList.find(t => String(t.id) === id)
     console.log(test);
     
     
  return (
    <div>
       <BreadCrum/>
      <h2>{test.name}</h2>
     <div>
      <span>Cancel</span>
      <button onClick={()=>navigate("/AddPatient", {state:{test}})}>Add patients</button>
     </div>
    </div>
  )
}

export default TestInfo