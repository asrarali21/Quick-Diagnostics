import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {RecoilRoot, useRecoilValue} from 'recoil'
import { ToastContainer } from 'react-toastify'
import GlobalSpinner from './components/GlobalSpinner.jsx';
import { LoadingStateApi } from './store/Loading.State.js';


function AppWrapper (){
  const loading = useRecoilValue(LoadingStateApi)
  return (
    <>
       {loading && <GlobalSpinner />}
      <BrowserRouter>
        <ToastContainer/>
        <App />
      </BrowserRouter>
    </>
  )
}

createRoot(document.getElementById('root')).render(

   <RecoilRoot>
   <AppWrapper/>
  </RecoilRoot>

)
