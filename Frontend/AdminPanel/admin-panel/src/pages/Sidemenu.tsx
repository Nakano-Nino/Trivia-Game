// src/App.tsx
import React from "react"
import { Box } from "@chakra-ui/react"

import HeaderPanel from "../components/Header"
const Sidemenu: React.FC = () => {
  return (
    <Box className="border-2">
      <HeaderPanel
        title="Admin Panel"
        description="All in one web for manage Celeb Minds APP"
      />
      <div className="flex container" style={{ flexDirection: "row" }}>
        <Box className="justify-center">
          <h1>Main Content</h1>
          <p>Your main content goes here.</p>
        </Box>
      </div>
    </Box>
  )
}

export default Sidemenu
