import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";



export const TestdataApiState = atom({
    key:"testDataAPiState",
    default:selector({
        key:"TestState",
        get:async()=>{
           try {
             const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tests/alltests`)
             return response?.data?.data || []
           } catch (error) {
             console.log(error);
             
           }
        }
    })
})



export const SingletestInfo = selectorFamily({
  key:"SingletestInfo",
   get : (TestID) => async () =>{
     if (!TestID) return null
     try {
       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tests/singleTest/${TestID}`)
       return response?.data?.data || null
     } catch (error) {
              console.error('Single product fetch failed:', e)
            return null
       
     }
   }
})