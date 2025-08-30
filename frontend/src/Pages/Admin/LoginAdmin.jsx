import React from 'react'

function LoginAdmin() {
  return (
    <div className="min-h-screen bg-[#F8F5FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 px-8 py-10">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7E0FF] text-[#6B4DE0] text-sm font-semibold">Z</span>
            <span className="text-sm font-medium text-[#6B4DE0]">Zemoso Diagnostics</span>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Login</h1>
            <p className="text-gray-500 mt-1">Access your admin dashboard</p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <div className="border-b-2 border-gray-300 focus-within:border-[#6B4DE0]">
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full bg-transparent outline-none border-none py-3 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <div className="border-b-2 border-gray-300 focus-within:border-[#6B4DE0]">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none border-none py-3 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="w-full rounded-lg bg-[#6B4DE0] text-white font-semibold py-3 transition-colors duration-200 hover:opacity-90"
          >
            Login
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">For authorized personnel only</p>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin