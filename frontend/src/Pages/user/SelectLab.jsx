import React from 'react'

import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'

function SelectLab() {
  const navigate = useNavigate()
  return (
    <div>
        <StepTracker currentStep ={0}/>
        <span>Cancel</span>  <button onClick={()=>navigate("/SelectAppointment")}>Select Date and Time</button>
    </div>
  )
}

export default SelectLab