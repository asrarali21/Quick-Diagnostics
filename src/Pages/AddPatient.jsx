import React from 'react'

import BreadCrum from '../components/BreadCrum'
import { useNavigate } from 'react-router-dom'

function AddPatient() {
  const navigate = useNavigate()
  return (
    <>
    <div>
     <BreadCrum />
    </div>
    <h3>Add Patient Details</h3>
    <p>Booking for whom</p>
 <div>
    <p >Name</p>
    <input type="text" />
 </div>
 <p>Date Of Birth</p>
    <input type="date" />
    <div>
      <div>
        <p>Gender</p>
       <input type="radio" /> <label >Male</label>
       <input type="radio" /> <label >Female</label>
       <input type="radio" /> <label >Other</label>
      </div>
     <span>Cancel</span>
     <button onClick={()=> navigate("/Labtest")}>Select Lab</button>
    </div>
    </>
  )
}
export default AddPatient