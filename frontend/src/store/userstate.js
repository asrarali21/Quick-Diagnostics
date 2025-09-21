import axios from "axios";
import { atom, selector } from "recoil";



export const userState = atom({
    key:"userState",
    default:{
        userID:null,
        firstName:"",
    }
})


export const UserDataApistate = selector({
    key:"UserDataApistate",
    get:async ()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me`,  {} ,{withCredentials:true})
            return response?.data?.data || []
        } catch (error) {
            console.error(error)
        }
    }
})


