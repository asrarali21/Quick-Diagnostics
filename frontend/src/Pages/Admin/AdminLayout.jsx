import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const active = 'bg-[#6B4DE0]/10 text-[#6B4DE0] font-medium no-underline hover:no-underline focus:outline-none'
  const base = 'block rounded-lg px-4 py-3 hover:bg-gray-50 no-underline hover:no-underline text-gray-900 visited:text-gray-900 focus:outline-none'

  return (
    <div className="min-h-screen bg-[#F8F5FF] text-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex md:flex-col">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#6B4DE0] text-white grid place-items-center font-semibold">Z</div>
            <div className="font-semibold">Zemoso Admin</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink end to="/admin" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Dashboard</NavLink>
          <NavLink to="/admin/add-test" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Add Test</NavLink>
          <NavLink to="/admin/tests" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Tests</NavLink>
          <NavLink to="/admin/reports" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Reports</NavLink>
          <NavLink to="/admin/appointments" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Appointments</NavLink>
          <NavLink to="/admin/users" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Users</NavLink>
          <NavLink to="/admin/settings" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Settings</NavLink>
        </nav>

        <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">© 2025 Zemoso</div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-lg bg-[#6B4DE0] text-white px-4 py-2 font-medium">Logout</button>
            </div>
          </div>
        </header>

        {/* Routed content */}
        <main className="max-w-6xl mx-auto w-full px-5 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
