import React, { useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const LogoutButton: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Process logout here
    setIsLoggingOut(true)

    // Simulate logout delay
    setTimeout(() => {
      // Replace with the login route or the appropriate route
      navigate("/login")
    }, 1000)
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center bg-red-500 text-white px-3 py-2 rounded focus:outline-none focus:shadow-outline-red justify-center"
    >
      <FaSignOutAlt className="mr-2" />
      {isLoggingOut ? "Logging Out..." : "Logout"}
    </button>
  )
}
export default LogoutButton
