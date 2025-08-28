import { atom } from "recoil";



export const userState = atom({
    key:"userState",
    default:{
        userID:null,
        firstName:"",
    }
})