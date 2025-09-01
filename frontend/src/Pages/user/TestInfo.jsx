import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


import { useRecoilValue } from 'recoil'

import BreadCrum from '../../components/BreadCrum'
import { SingletestInfo } from '../../store/test.state'
function TestInfo() {
  const navigate = useNavigate()
    const {id} =useParams()
     const Test =  useRecoilValue(SingletestInfo(id))
     console.log(Test);
     
     
     
  return (
    <>
    <div className='flex justify-center items-center'>
       <BreadCrum/>
    </div >
     <div>
      <h2 className='text-center'>{Test.name}</h2>
      <div>
        <img src="" alt="" />
        <p>{Test.features}</p>
      <p>{Test.price}</p>
      <p>{Test.reportTime}</p>
      <p>{Test.description}</p>

      </div>
      <div></div>
      <span>Cancel</span>
      <button onClick={()=>navigate("/AddPatient", {state:{Test}})}>Add patients</button>
     </div>
    </>
  )
}

export default TestInfo