// src/components/Header.tsx
import React, { useState } from "react"
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"
import Sidenav from "./Sidenav"
import LoginTime from "./LoginTime"

interface HeaderProps {
  title: string
  description: string
}

const HeaderPanel: React.FC<HeaderProps> = ({ title, description }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const username = "admin"

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
      <Box bg="purple.500" color="white" p={4} mb={4} borderRadius={"lg"}>
        <div className="flex justify-center items-center">
          <Button className=" flex justify-center" onClick={toggleSidebar}>
            <GiHamburgerMenu />
            <Text className="text-xl ms-4">Menu</Text>
          </Button>
          <div className="text-center mr-auto" style={{ marginLeft: "20rem" }}>
            <Heading as="h1" size="xl" className="w-full">
              {title}
            </Heading>
            <p>{description}</p>
          </div>
          <div className="ml-auto">
            <Image
              src="https://res.cloudinary.com/dem7wdexn/image/upload/f_auto,q_auto/r19rz0xzkyjngphsqagb"
              style={{ width: "150px", height: "150px", marginTop: "10px" }}
            />
          </div>
        </div>

        <Sidenav isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div className="flex">
          <LoginTime username={username} />
          <Text marginLeft={"25rem"}>Hello, Admin</Text>
        </div>
      </Box>
    </>
  )
}

export default HeaderPanel
