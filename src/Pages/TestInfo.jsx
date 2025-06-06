import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
function TestInfo() {
    const {id} =useParams()
    
    

    useEffect(() => {
        const TestinfoData = async ()=>{
            const data = await axios.get(`http://localhost:3001/tests/${id}`)
console.log(data);

        }
        TestinfoData()
      
    }, [id])
    
  return (
    <div>

    </div>
  )
}

export default TestInfo