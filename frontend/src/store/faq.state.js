import axios from "axios";
import { atom, selector,  } from "recoil";


export const faqDataSelector = selector({
  key: "faqDataSelector",
  get: async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/faq/getFaq", { withCredentials: true })
      return res?.data?.data || []
    } catch (e) {
      console.error("FAQ fetch error:", e)
      return []
    }
  }
})