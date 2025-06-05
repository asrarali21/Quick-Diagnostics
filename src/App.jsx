
import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Search from './components/Search';
import { useSetRecoilState } from 'recoil';
import { apiDataState, ApiFaqState, apiTestimonialState } from './apiState';
import CommonlyBooked from './components/CommonlyBooked';
import TestList from './components/TestList';
import axios from 'axios'
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

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
     <Navbar/>
     <Search/>
     <CommonlyBooked/>
     <TestList/>
     <Testimonial/>
     <FAQ/>
     <Footer/>
    </>
  )
}

export default App
