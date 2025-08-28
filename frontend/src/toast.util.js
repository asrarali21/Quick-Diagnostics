import { toast } from "react-toastify"

export const handlesuccess =(msg)=>{
    toast.success(msg , {
        position:'top-center',
        autoClose:1500
    })
}

export const handleError =(msg)=>{
    toast.error(msg , {
        position:'top-center',
        autoClose:1000
    })
}