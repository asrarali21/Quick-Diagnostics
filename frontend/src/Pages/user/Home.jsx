import React, { Suspense, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Navbar from '../../components/Navbar'
import Search from '../../components/Search'
import CommonlyBooked from '../../components/CommonlyBooked'
import TestList from '../../components/TestList'
import Testimonial from '../../components/Testimonial'
import FAQ from '../../components/FAQ'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import WhyChooseUs from '../../components/WhyChooseUs'
import Chatbot from '../../components/Chatbot'
import GlobalSpinner from '../../components/GlobalSpinner'
import { authModalOpenState, authModalDismissedState } from '../../store/authModal.state'

function Home() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(authModalOpenState)
  const [isDismissed, setIsDismissed] = useRecoilState(authModalDismissedState)
  const hasTriggered = useRef(false)

  useEffect(() => {
    // Check if user is already authenticated (has token in cookies/localStorage)
    const isAuthenticated = document.cookie.includes('token') || localStorage.getItem('token')

    // Check sessionStorage for dismissed state on mount
    const wasDismissed = sessionStorage.getItem('authModalDismissed') === 'true'
    if (wasDismissed) {
      setIsDismissed(true)
    }

    // If already authenticated or dismissed, don't show modal
    if (isAuthenticated || wasDismissed || isDismissed) {
      return
    }

    // Timer trigger: Show modal after 3.5 seconds
    const timer = setTimeout(() => {
      if (!hasTriggered.current && !sessionStorage.getItem('authModalDismissed')) {
        hasTriggered.current = true
        setIsModalOpen(true)
      }
    }, 3500)

    // Scroll trigger: Show modal when user scrolls 30% down
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercent >= 30 && !hasTriggered.current && !sessionStorage.getItem('authModalDismissed')) {
        hasTriggered.current = true
        setIsModalOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setIsModalOpen, isDismissed, setIsDismissed])

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

          <Suspense fallback={<GlobalSpinner />}>
            <CommonlyBooked />
          </Suspense>

          <WhyChooseUs />
          <TestList />
          <Testimonial />
          <div className="pb-14"><FAQ /></div>
        </div>
      </main>
      <Footer className="mt-auto" />
      <Chatbot />
    </div>
  )
}

export default Home