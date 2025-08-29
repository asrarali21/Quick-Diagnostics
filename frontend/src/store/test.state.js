import axios from "axios";
import { atom, selector } from "recoil";



export const TestdataApiState = atom({
    key:"testDataAPiState",
    default:selector({
        key:"TestState",
        get:async()=>{
           try {
             const response = await axios.get("http://localhost:8000/api/v1/tests/alltests")
             return response?.data?.data || []
           } catch (error) {
             console.log(error);
             
           }
        }
    })
})