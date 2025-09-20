import axios from "axios";
import { selector } from "recoil";



export const TestimonialDataState = selector({
    key:"TestimonialDataState",
    get:async()=>{
       try {
         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/testimonial/getTestimonial`)
         return response?.data?.data
       } catch (error) {
        console.error(error)
       }
    }
})