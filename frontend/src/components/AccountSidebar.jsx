import React from 'react'
import { X, ChevronRight, MapPin, Users, CreditCard, Home, Gift, HelpCircle, FileText, LogOut } from 'lucide-react'



function AccountSidebar({ isOpen, onClose }) {
  if (!isOpen) return null // simple early return


    
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

        {/* Profile */}
        <div className="pt-12 px-10 pb-6 border-b border-gray-100">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-white text-gray-400">
              <span className="text-sm font-medium">P</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[20px] font-medium text-gray-900 leading-tight mb-1 truncate">Patrick Smith</h3>
              <p className="text-sm text-gray-600 leading-tight truncate">patricksmith@gmail.com</p>
              <p className="text-sm text-gray-600 leading-tight mt-1">+1 330-617-3324</p>
            </div>
            <button className="text-[#7C5CFC] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500/30 rounded">Edit</button>
          </div>
        </div>

        {/* Simple scroll area */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <nav className="divide-y divide-gray-100">
            {menuItems.map((item, idx) => (
              <MenuItem key={idx} {...item} />
            ))}
          </nav>
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
      className="group w-full flex items-start justify-between gap-4 px-8 py-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
    >
      <div className="flex items-start gap-4">
        <Icon className="w-5 h-5 text-[#7C5CFC] mt-0.5" />
        <div className="text-left">
          <p className="text-[15px] font-medium text-gray-800 leading-tight mb-0.5">{title}</p>
          {description && <p className="text-[12px] text-gray-500 leading-snug line-clamp-1">{description}</p>}
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
