import axios from "axios";
import { selector } from "recoil";



export const TestimonialDataState = selector({
    key:"TestimonialDataState",
    get:async()=>{
       try {
         const response = await axios.get("http://localhost:8000/api/v1/testimonial/getTestimonial")
         return response?.data?.data
       } catch (error) {
        console.error(error)
       }
    }
})