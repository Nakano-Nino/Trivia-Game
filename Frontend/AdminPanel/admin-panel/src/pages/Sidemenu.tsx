// src/App.tsx
import React, { useState } from "react"
import { Button, Text } from "@chakra-ui/react"
import Sidenav from "../components/Sidenav"
import { GiHamburgerMenu } from "react-icons/gi"
import HeaderPanel from "../components/Header"
const Sidemenu: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <HeaderPanel
        title="Admin Panel"
        description="Manage your application with ease."
      />
      <div className="flex container">
        <Button className=" flex justify-center" onClick={toggleSidebar}>
          <GiHamburgerMenu />
          <Text className="text-xl ms-4">Menu</Text>
        </Button>

        <Sidenav isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div className="flex-1 p-8">
          <h1>Main Content</h1>
          <p>Your main content goes here.</p>
        </div>
      </div>
    </>
  )
}

export default Sidemenu
