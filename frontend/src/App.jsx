
import { useEffect,  } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { useSetRecoilState } from 'recoil';
import { apiDataState, ApiFaqState, apiTestimonialState } from './apiState';
import axios from 'axios'
import { Route, Routes,  } from 'react-router-dom';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Appointments from './Pages/Appointments';
import TestInfo from './Pages/TestInfo';
import AddPatient from './Pages/AddPatient';
import SelectLab from './Pages/SelectLab';
import SelectAppointment from './Pages/SelectAppointment';
import AddAddress from './Pages/AddAddress';
import ReviewOrder from './Pages/ReviewOrder';
import Register from './Pages/Register';
import EntermobileNum from './Pages/EntermobileNum';
import Login from './Pages/Login';
import VerifyOtp from './Pages/VerifyOtp';

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
     </Routes>
    </>
  )
}

export default App
