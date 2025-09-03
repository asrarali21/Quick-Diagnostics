import React from 'react'
import StepTracker from '../../components/StepTracker'

function ReviewOrder() {


     
  return (
    <div>
        <StepTracker currentStep={3}/>
  

        <span>Cancel</span> <button>Continue </button>
    </div>
  )
}

export default ReviewOrder