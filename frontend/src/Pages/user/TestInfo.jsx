import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


import { useRecoilValue } from 'recoil'
import { apiDataState } from '../../apiState'
import BreadCrum from '../../components/BreadCrum'
function TestInfo() {
  const navigate = useNavigate()
    const {id} =useParams()
     const TestInfoList =  useRecoilValue(apiDataState)
     const test = TestInfoList.find(t => String(t.id) === id)
     console.log(test);
     
     
  return (
    <>
    <div className='flex justify-center items-center'>
       <BreadCrum/>
    </div >
     <div>
      <h2 className='text-center'>{test.name}</h2>
      <div>
      <p>{test.price}</p>
      <p>{test.reportTime}</p>
      <p>{test.description}</p>
      </div>
      <div></div>
      <span>Cancel</span>
      <button onClick={()=>navigate("/AddPatient", {state:{test}})}>Add patients</button>
     </div>
    </>
  )
}

export default TestInfo