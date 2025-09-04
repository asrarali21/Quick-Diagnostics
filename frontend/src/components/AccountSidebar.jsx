import React, { useEffect, useRef } from 'react'
import { X, ChevronRight, MapPin, Users, CreditCard, Home, Gift, HelpCircle, FileText, LogOut } from 'lucide-react'



function AccountSidebar({ isOpen, onClose }) {
  // UX enhancements: focus management, Esc-to-close, lock body scroll when open
  const panelRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      // focus the panel for accessibility
      panelRef.current?.focus()
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay with fade + backdrop blur */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-title"
        tabIndex={-1}
        className={`
        fixed top-0 right-0 h-full w-[420px] max-w-full bg-white shadow-2xl ring-1 ring-black/5 rounded-l-2xl z-50
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        {/* Header - sticky for better UX */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur border-b border-gray-100">
          <h2 id="account-title" className="text-lg font-medium text-gray-800">Account</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-6 py-6 bg-white">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img 
                src={""} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">Patrick Smith</h3>
              <p className="text-sm text-gray-600 mb-1 truncate">patricksmith@gmail.com</p>
              <p className="text-sm text-gray-600">+1 330-617-3324</p>
            </div>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500/30 rounded">
              Edit
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  )
}

// Menu Item Component
function MenuItem({ icon: Icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
    >
      <div className="flex items-start space-x-4">
        <Icon className="w-5 h-5 text-purple-600 mt-0.5" />
        <div className="text-left">
          <p className="font-medium text-gray-900 mb-1">{title}</p>
          {description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-1">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  )
}

// Menu Items Data
const menuItems = [
  {
    icon: MapPin,
    title: "Track My Orders",
    description: "Track your recent orders & see order status",
    onClick: () => console.log("Navigate to orders")
  },
  {
    icon: Users,
    title: "My Family & Friends",
    description: "Manage & view family members & reports",
    onClick: () => console.log("Navigate to family")
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Payment modes & refund status",
    onClick: () => console.log("Navigate to payments")
  },
  {
    icon: Home,
    title: "Manage Address",
    description: "2235 California Street Mountain View Cali...",
    onClick: () => console.log("Navigate to address")
  },
  {
    icon: Gift,
    title: "Offers",
    description: "See offers for more details",
    onClick: () => console.log("Navigate to offers")
  },
  {
    icon: HelpCircle,
    title: "Help",
    description: "FAQ's & general queries",
    onClick: () => console.log("Navigate to help")
  },
  {
    icon: FileText,
    title: "Terms & conditions",
    description: null,
    onClick: () => console.log("Navigate to terms")
  },
  {
    icon: LogOut,
    title: "Logout",
    description: null,
    onClick: () => console.log("Logout user")
  }
]

export default AccountSidebar
