import React from 'react'
import StepTracker from '../components/StepTracker'
import { useNavigate } from 'react-router-dom'

function SelectAppointment() {
    const navigate = useNavigate()
  return (
    <div>
         <StepTracker currentStep={1}/>
         <span>Cancel</span> <button onClick={()=> navigate("/AddAddress")}>Add Address</button>
    </div>
  )
}

export default SelectAppointment