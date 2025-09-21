import { useEffect,  } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { useSetRecoilState } from 'recoil';
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
import Checkout from './Pages/user/Checkout';
// public/auth pages kept at Pages root
import Register from './Pages/auth/Register';
import EntermobileNum from './Pages/auth/EntermobileNum';
import Login from './Pages/auth/Login';
import VerifyOtp from './Pages/auth/VerifyOtp';
// admin
import LoginAdmin from './Pages/Admin/LoginAdmin';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminAddTest from './Pages/Admin/AdminAddTest';
import PaymentSuccess from './Pages/user/PaymentSuccess';
import TrackOrder from './Pages/user/TrackOrder';
import ForgotPassword from './Pages/auth/ForgotPassword';
import ResetPassword from './Pages/auth/ResetPassword';

function App() {
        
          
      
  return (
    <>
    <Routes>
      <Route path='/' element ={ <Register/>  }/>
      <Route path='/login' element ={ <Login/>  }/>
      <Route path='/mobileNo' element ={ <EntermobileNum/>  }/>
      <Route path='/verifyOtp' element ={ <VerifyOtp/>  }/>
      <Route path='/ForgotPassword' element ={ <ForgotPassword/>  }/>
      <Route path='/resetPassword' element ={ <ResetPassword/>  }/>
      <Route path='/home' element ={ <Home/>  }/>
      <Route path='/reports' element ={ 
        <>
         <Navbar/>
          <Reports/>  
        </>
      }
      />
      <Route path='/appointments' element ={
        <>
        <Navbar/>
        <Appointments/>
        </>
        }/>
        <Route path='/testinfo/:id' element={<TestInfo/>}/>
        <Route path='/AddPatient' element={<AddPatient/>}/>
        <Route path='/Lab' element={<SelectLab/>}/>
        <Route path='/SelectAppointment' element={<SelectAppointment/>}/>
        <Route path='/AddAddress' element={<AddAddress/>}/>
        <Route path='/reviewOrder/:orderId' element={<ReviewOrder/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
        <Route path="/trackOrder/:orderId" element={<TrackOrder />} />

        {/* admin auth */}
        <Route path='/adminLogin' element={<LoginAdmin/>}/>

        {/* admin app layout + children */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>} />
          <Route path='add-test' element={<AdminAddTest/>} />
          {/* add more sections here: tests, reports, appointments, users, settings */}
        </Route>
     </Routes>
    </>
  )
}

export default App
