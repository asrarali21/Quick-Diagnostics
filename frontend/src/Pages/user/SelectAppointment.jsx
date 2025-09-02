import React, { useEffect } from 'react'
import StepTracker from '../../components/StepTracker'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { orderState } from '../../store/order.state'

function SelectAppointment() {
    const navigate = useNavigate()
   
    const labId = useRecoilValue(orderState)
    console.log("lab id ",labId.labId);
    


   const todayDate = new Date().toISOString().split("T")[0]

    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/slot/getslot" , {params:{labId:labId.labId,date:todayDate }})
        console.log(response);
        
      } catch (error) {
        
      }
    }
    useEffect(()=>{
      fetchSlots()
    } ,[])
  return (
    <div>
         <StepTracker currentStep={1}/>

         <span>Cancel</span> <button onClick={()=> navigate("/AddAddress")}>Add Address</button>
    </div>
  )
}

export default SelectAppointment