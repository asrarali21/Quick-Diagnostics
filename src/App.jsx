
import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { useSetRecoilState } from 'recoil';
import { apiDataState, ApiFaqState, apiTestimonialState } from './apiState';
import axios from 'axios'
import { Route, Routes, useParams } from 'react-router-dom';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Appointments from './Pages/Appointments';
import TestInfo from './Pages/TestInfo';
import AddPatient from './Pages/AddPatient';
import SelectLab from './Pages/SelectLab';

function App() {
 
  const setApiData = useSetRecoilState(apiDataState)
  const setTestmonialData = useSetRecoilState(apiTestimonialState)
  const setFaqData = useSetRecoilState(ApiFaqState)


  useEffect(() => {
    const FetchedData = async () => { 
        try {
              let response = await fetch("http://localhost:3001/tests")
          let data = await response.json()
          
          setApiData(data)
          
        } catch (error) {
          console.error("Failed to fetch data" , error)
        }
      
       }
       FetchedData()
      }, [])

      useEffect(() => {
        const TestimonialDataFetch = async ()=>{
        const TestimonialData = await  axios.get("http://localhost:3001/testimonials")
        setTestmonialData(TestimonialData.data);
        
        }
      
       TestimonialDataFetch()
      }, [])

            useEffect(() => {
        const FaqDataFetch = async ()=>{

        const FaqData = await  axios.get("http://localhost:3001/faqs")
        setFaqData(FaqData.data);
        
        }
      
       FaqDataFetch()
      }, [])


        
          
      
  return (
    <>
    <Routes>
      <Route path='/' element ={ <Home/>  }/>
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
     </Routes>
    </>
  )
}

export default App
