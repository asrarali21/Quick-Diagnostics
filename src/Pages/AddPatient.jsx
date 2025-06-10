import React from 'react'

import BreadCrum from '../components/BreadCrum'
import { useNavigate } from 'react-router-dom'

function AddPatient() {
  const navigate = useNavigate()
  return (
    <div>
     <BreadCrum />
     <span>Cancel</span>
     <button onClick={()=> navigate("/Labtest")}>Select Lab</button>
    </div>
  )
}
export default AddPatient