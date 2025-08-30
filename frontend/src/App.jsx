import { useEffect,  } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { useSetRecoilState } from 'recoil';
import { apiDataState, ApiFaqState, apiTestimonialState } from './apiState';
import axios from 'axios'
import { Route, Routes,  } from 'react-router-dom';
// user pages under Pages/user
import Home from './Pages/user/Home';
import Reports from './Pages/user/Reports';
import Appointments from './Pages/user/Appointments';
import TestInfo from './Pages/user/TestInfo';
import AddPatient from './Pages/user/AddPatient';
import SelectLab from './Pages/user/SelectLab';
import SelectAppointment from './Pages/user/SelectAppointment';
import AddAddress from './Pages/user/AddAddress';
import ReviewOrder from './Pages/user/ReviewOrder';
// public/auth pages kept at Pages root
import Register from './Pages/auth/Register';
import EntermobileNum from './Pages/Auth/EntermobileNum';

import VerifyOtp from './Pages/auth/VerifyOtp';
// admin
import LoginAdmin from './Pages/Admin/LoginAdmin';
import Login from './Pages/auth/Login';

function App() {
        
          
      
  return (
    <>
    <Routes>
      <Route path='/' element ={ <Register/>  }/>
      <Route path='/login' element ={ <Login/>  }/>
      <Route path='/mobileNo' element ={ <EntermobileNum/>  }/>
      <Route path='/verifyOtp' element ={ <VerifyOtp/>  }/>
      <Route path='/home' element ={ <Home/>  }/>
      <Route path='/reports' element ={ <>
         <Navbar/>
          <Reports/>  
        </>}/>
      <Route path='/appointments' element ={
        <>
        <Navbar/>
        <Appointments/>
        </>
        }/>
        <Route path='/testinfo/:id' element={<TestInfo/>}/>
        <Route path='/AddPatient' element={<AddPatient/>}/>
        <Route path='/Labtest' element={<SelectLab/>}/>
        <Route path='/SelectAppointment' element={<SelectAppointment/>}/>
        <Route path='/AddAddress' element={<AddAddress/>}/>
        <Route path='/reviewOrder' element={<ReviewOrder/>}/>

        {/* admin routes */}
        <Route path='/adminLogin' element={<LoginAdmin/>}/>
     </Routes>
    </>
  )
}

export default App
