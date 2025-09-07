import React from 'react'
import Navbar from '../../components/Navbar'
import Search from '../../components/Search'
import CommonlyBooked from '../../components/CommonlyBooked'
import TestList from '../../components/TestList'
import Testimonial from '../../components/Testimonial'
import FAQ from '../../components/FAQ'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import WhyChooseUs from '../../components/WhyChooseUs'

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="pt-14 flex-1">
        {/* Top stack: Search + Banner */}
        <div className="space-y-5">
          <Search />
          <Banner />
        </div>
        {/* Content sections with controlled vertical rhythm */}
        <div className="mt-10 space-y-14">
          <CommonlyBooked />
          <WhyChooseUs />
          <TestList />
          <Testimonial />
          <div className="pb-14"><FAQ /></div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Home