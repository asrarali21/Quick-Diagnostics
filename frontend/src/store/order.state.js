import { atom } from "recoil";



export const orderState = atom({
    key:"orderState",
    default:{
    patientId: null,
    labId: null,
    slotId: null,
    addressId: null,
    }
})