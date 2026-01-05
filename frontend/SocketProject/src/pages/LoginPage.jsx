import React, { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FFF7ED]">
      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-[#363434] text-3xl font-bold mt-4">Welcome Back</h1>
            <p className="text-gray-500 mt-2">
              Login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[#363434]">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-md border border-gray-300
                           focus:outline-none focus:border-[#F97316] text-[#F97316] font-bold"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[#363434]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-md border border-gray-300
                             focus:outline-none focus:border-[#F97316] pr-12 text-[#F97316] font-bold"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-md font-semibold text-white
                         bg-[#F97316] hover:bg-[#EA580C] transition"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#F97316] hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT - HERO */}
      <div className="hidden lg:flex items-center justify-center bg-[#F97316]/5">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-[#363434] text-4xl font-bold">
            Welcome back to{" "}
            <span className="text-[#F97316]">Chatty</span>
          </h2>
          <p className="text-gray-500">
            Continue your conversations and stay connected.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
