import React from "react";

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-[#F8F5FF] text-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex md:flex-col">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#6B4DE0] text-white grid place-items-center font-semibold">
              Z
            </div>
            <div className="font-semibold">Zemoso Admin</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <a className="block rounded-lg px-4 py-3 bg-[#6B4DE0]/10 text-[#6B4DE0] font-medium" href="#dashboard">Dashboard</a>
          <a className="block rounded-lg px-4 py-3 hover:bg-gray-50" href="#add-test">Add Test</a>
          <a className="block rounded-lg px-4 py-3 hover:bg-gray-50" href="#tests">Tests</a>
          <a className="block rounded-lg px-4 py-3 hover:bg-gray-50" href="#reports">Reports</a>
          <a className="block rounded-lg px-4 py-3 hover:bg-gray-50" href="#appointments">Appointments</a>
          <a className="block rounded-lg px-4 py-3 hover:bg-gray-50" href="#users">Users</a>
          <a className="block rounded-lg px-4 py-3 hover:bg-gray-50" href="#settings">Settings</a>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
          © 2025 Zemoso
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg bg-[#6B4DE0] text-white px-4 py-2 font-medium"
                title="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto w-full px-5 py-8 space-y-10">
          {/* Overview cards */}
          <section id="dashboard" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Add Test */}
          <section id="add-test" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Add Test</h2>
              <a href="#tests" className="text-sm text-[#6B4DE0] font-medium">View All Tests</a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Test Name</label>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400" placeholder="e.g. Complete Blood Count" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Category</label>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400" placeholder="e.g. Hematology" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Price</label>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400" placeholder="e.g. 799" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Sample Type</label>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400" placeholder="e.g. Blood" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 mb-2">Description</label>
                <textarea rows="3" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400" placeholder="Short description..." />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-[#6B4DE0] text-white px-5 py-2.5 font-medium"
              >
                Save Test
              </button>
            </div>
          </section>

          {/* Lists */}
          <section id="tests" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tests</h2>
              <a href="#add-test" className="text-sm text-[#6B4DE0] font-medium">Add New</a>
            </div>
            <div className="text-sm text-gray-500">No tests to display.</div>
          </section>

          <section id="reports" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Reports</h2>
              <a href="#appointments" className="text-sm text-[#6B4DE0] font-medium">Manage</a>
            </div>
            <div className="text-sm text-gray-500">No reports to display.</div>
          </section>

          <section id="appointments" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Appointments</h2>
              <a href="#users" className="text-sm text-[#6B4DE0] font-medium">View All</a>
            </div>
            <div className="text-sm text-gray-500">No appointments scheduled.</div>
          </section>

          <section id="users" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Users</h2>
              <a href="#settings" className="text-sm text-[#6B4DE0] font-medium">Manage</a>
            </div>
            <div className="text-sm text-gray-500">No users to display.</div>
          </section>

          <section id="settings" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-2">Settings</h2>
            <div className="text-sm text-gray-500">Configure admin preferences.</div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;