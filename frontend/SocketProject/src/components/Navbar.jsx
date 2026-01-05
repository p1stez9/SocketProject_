import React from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Link, useNavigate } from "react-router-dom"
import { LogOut, MessageSquare, Settings, User } from "lucide-react"

const Navbar = () => {
  const { logout, authUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <header className="fixed top-0 z-40 w-full border-b border-orange-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* LEFT - LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="size-9 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
              <MessageSquare className="size-5 text-[#F97316]" />
            </div>
            <span className="text-lg font-bold text-[#F97316]">
              Chatty
            </span>
          </Link>

          {/* RIGHT - ACTIONS */}
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="btn btn-sm gap-2 btn-ghost text-[#F97316] hover:bg-[#F97316]/10"
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm gap-2 btn-ghost text-[#F97316] hover:bg-[#F97316]/10"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm gap-2 border-[#F97316] text-[#F97316]
                             hover:bg-[#F97316] hover:text-white transition"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
