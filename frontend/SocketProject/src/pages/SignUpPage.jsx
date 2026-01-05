import React, { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required")
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format")
    if (!formData.password) return toast.error("Password is required")
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters")
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      signup(formData)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#363434]">Create Account</h1>
          <p className="text-gray-500 mt-2">It’s quick and easy</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#363434]">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-md border border-gray-300
                            focus:outline-none focus:border-[#F97316] 
                            pr-12 text-[#F97316] font-bold"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#363434]">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-md border border-gray-300
                            focus:outline-none focus:border-[#F97316] 
                            pr-12 text-[#F97316] font-bold"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#363434]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-md border border-gray-300
                             focus:outline-none focus:border-[#F97316] 
                             pr-12 text-[#F97316] font-bold"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-[#F97316] text-white py-3 rounded-md
                       font-semibold hover:bg-[#FB923C] transition
                       flex items-center justify-center gap-2"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#F97316] font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
