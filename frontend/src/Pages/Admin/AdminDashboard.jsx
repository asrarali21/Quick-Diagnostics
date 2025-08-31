import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="space-y-10">
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-sm text-gray-500">Total Tests</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-sm text-gray-500">Pending Reports</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-sm text-gray-500">Appointments Today</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-sm text-gray-500">Active Users</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-2">Welcome</h2>
        <p className="text-sm text-gray-600">Use the sidebar to manage tests, reports, users and more.</p>
      </section>
    </div>
  )
}

export default AdminDashboard
