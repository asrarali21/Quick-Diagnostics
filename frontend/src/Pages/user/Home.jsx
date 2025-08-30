import React from 'react'
import Navbar from '../../components/Navbar'
import Search from '../../components/Search'
import CommonlyBooked from '../../components/CommonlyBooked'
import TestList from '../../components/TestList'
import Testimonial from '../../components/Testimonial'
import FAQ from '../../components/FAQ'
import Footer from '../../components/Footer'




function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="pt-14 flex-1">
        <Search/>
        <div className='mt-10 '>
        <CommonlyBooked/>
        </div>
        <TestList/>
        <Testimonial/>
        <div className='mb-14'>
        <FAQ/>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Home