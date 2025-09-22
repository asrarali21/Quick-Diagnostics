import { toast } from "react-toastify"

export const handlesuccess = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 1500,
    style: {
      background: '#c5dcf0',
      color: 'black',
      fontWeight: '500',
      fontSize: '1rem',
    },
    icon: false,
  })
}

export const handleError = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 1000,
    style: {
      background: '#c5dcf0',
      color: 'black',
      fontWeight: '500',
      fontSize: '1rem',
    },
    icon: false,
  })
}