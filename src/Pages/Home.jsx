import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import CommonlyBooked from '../components/CommonlyBooked'
import TestList from '../components/TestList'
import Testimonial from '../components/Testimonial'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'




function Home() {
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

export default Home