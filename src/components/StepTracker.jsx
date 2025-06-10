import React from 'react'
import { useNavigate } from 'react-router-dom'

function StepTracker({currentStep}) {
    const navigate = useNavigate()
    const steps = ["Lab test" , "Select appointment"  , "Add Address", "Review order"]
  return (
    <div>
            <div>
                <button onClick={()=>navigate("/")}>back</button>
                {steps.map((item ,i )=>(
                 
                    <span key={i} className={`
                        ${i === currentStep ? 'text-black font-bold' : ''}
                          ${i  < currentStep ? 'text-purple-600' : ''}
                        `}>
                       {i >= 1 ? '>' : ""}  {item}</span>
                       
                ))}
            </div>

    </div>
  )
}

export default StepTracker