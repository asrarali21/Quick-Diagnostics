import React from 'react'
import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'

function AddAddress() {
    const navigate = useNavigate()
  return (
    <div>
            <StepTracker currentStep={2}/>
        <span>Cancel</span>  <button onClick={()=>navigate("/reviewOrder")}>Review Order</button>
    </div>
  )
}

export default AddAddress