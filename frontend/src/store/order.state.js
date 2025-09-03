import { atom } from "recoil";



export const orderState = atom({
    key:"orderState",
    default:{
 patient: null , 
  test: null,
  lab: null,
  slot: null,
  address: null,
    }
})