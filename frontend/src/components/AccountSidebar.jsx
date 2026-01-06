import React from 'react'
import { X, ChevronRight, LogOut, LogIn, UserPlus } from 'lucide-react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { UserDataApistate } from '../store/userstate'
import { authModalOpenState, authModalTabState } from '../store/authModal.state'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AccountSidebar({ isOpen, onClose }) {
  const userInfo = useRecoilValue(UserDataApistate)
  const setAuthModalOpen = useSetRecoilState(authModalOpenState)
  const setAuthModalTab = useSetRecoilState(authModalTabState)

  const navigate = useNavigate()
  if (!isOpen) return null


  const isLoggedIn = userInfo && userInfo.email

  // Open auth modal handler
  const handleOpenAuthModal = (tab) => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
    onClose()
  }


  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/logout`, {}, { withCredentials: true })
      setTimeout(() => {
        window.location.reload() // Reload to reset state
      }, 500);
      onClose()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      {/* Sidebar Panel */}
      <div className="fixed top-0 right-0 h-full w-[430px] max-w-full bg-white shadow-2xl ring-1 ring-black/5 rounded-l-2xl z-50 flex flex-col animate-slide-in" >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (

          <>

            <div className="pt-12 px-10 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full border-2 border-[#647FBC] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#647FBC]/10 to-[#7C5CFC]/10 text-[#647FBC]">
                  <span className="text-xl font-semibold">{(userInfo?.firstName?.[0] || 'U').toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[20px] font-semibold text-gray-900 leading-tight mb-1 truncate">
                    {userInfo?.firstName} <span>{userInfo?.lastName}</span>
                  </h3>
                  <p className="text-sm text-gray-600 leading-tight truncate">{userInfo?.email}</p>
                  {userInfo?.phoneNumber && (
                    <p className="text-sm text-gray-500 leading-tight mt-1">{userInfo?.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items for Logged In User */}
            <div className="flex-1 overflow-y-auto px-2 py-4">
              <nav className="space-y-1">
                <MenuItem
                  icon={LogOut}
                  title="Logout"
                  description="Sign out of your account"
                  onClick={handleLogout}
                />
              </nav>
            </div>
          </>
        ) : (

          <>
            {/* Welcome Header */}
            <div className="pt-16 px-10 pb-8 border-b border-gray-100">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#647FBC]/20 to-[#647FBC]/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#647FBC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h3>
                <p className="text-sm text-gray-500">Sign in to access your account and manage your appointments</p>
              </div>
            </div>

            {/* Login/Signup Options */}
            <div className="flex-1 px-8 py-6">
              <div className="space-y-3">
                {/* Login Button */}
                <button
                  onClick={() => handleOpenAuthModal('login')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#647FBC] to-[#647FBC] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#647FBC]/25 transition-all duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </button>

                {/* Signup Button */}
                <button
                  onClick={() => handleOpenAuthModal('register')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[#647FBC] text-[#647FBC] font-medium rounded-xl hover:bg-[#647FBC]/5 transition-all duration-200"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Why sign in?</p>
                <div className="space-y-3">
                  <BenefitItem text="Track your test bookings" />
                  <BenefitItem text="View and download reports" />
                  <BenefitItem text="Manage family members" />
                  <BenefitItem text="Get exclusive offers" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// Menu Item Component
function MenuItem({ icon: Icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-start justify-between gap-4 px-8 py-4 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
    >
      <div className="flex items-start gap-4">
        <Icon className="w-5 h-5 text-[#647FBC] mt-0.5" />
        <div className="text-left">
          <p className="text-[15px] font-medium text-gray-800 leading-tight mb-0.5">{title}</p>
          {description && <p className="text-[12px] text-gray-500 leading-snug line-clamp-1">{description}</p>}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  )
}

// Benefit Item Component
function BenefitItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  )
}

export default AccountSidebar
