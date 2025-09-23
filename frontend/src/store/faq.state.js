import axios from "axios";
import {  selector,  } from "recoil";


export const faqDataSelector = selector({
  key: "faqDataSelector",
  get: async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/faq/getFaq`, { withCredentials: true })
      return res?.data?.data || []
    } catch (e) {
      console.error("FAQ fetch error:", e)
      return []
    }
  }
})