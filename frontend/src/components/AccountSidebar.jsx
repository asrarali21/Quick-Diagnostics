import React from 'react'
import { X, ChevronRight, MapPin, Users, CreditCard, Home, Gift, HelpCircle, FileText, LogOut } from 'lucide-react'



function AccountSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay - Dark background that covers the entire screen */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100">
          <h2 className="text-lg font-medium text-gray-700">Account</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-6 py-6 bg-white">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <img 
                src={""} 
                alt="User Avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Patrick Smith</h3>
              <p className="text-sm text-gray-600 mb-1">patricksmith@gmail.com</p>
              <p className="text-sm text-gray-600">+1 330-617-3324</p>
            </div>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors mt-1">
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
      className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className="flex items-start space-x-4">
        <Icon className="w-5 h-5 text-purple-600 mt-0.5" />
        <div className="text-left">
          <p className="font-medium text-gray-900 mb-1">{title}</p>
          {description && (
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
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
