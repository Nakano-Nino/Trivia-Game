import React, { useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const LogoutButton: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      localStorage.removeItem("token")
      navigate("/")
    }, 1000)
    Swal.fire({
      icon: "success",
      title: "Logout Success!",
      showConfirmButton: false,
      timer: 1200,
    })
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
