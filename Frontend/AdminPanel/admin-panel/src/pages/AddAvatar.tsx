// src/App.tsx
import React from "react"
import { Box } from "@chakra-ui/react"

import HeaderPanel from "../components/Header"
import FormAvatar from "./FormAvatar"
const AddAvatar: React.FC = () => {
  const handleCreate = (data: any) => {
    console.log("Data created:", data)
  }
  return (
    <Box className="border-2">
      <HeaderPanel
        title="Admin Panel"
        description="All in one web for manage Celeb Minds APP"
      />
      <div className="flex container" style={{ flexDirection: "row" }}>
        <Box className="justify-center">
          <FormAvatar onCreate={handleCreate} />
        </Box>
      </div>
    </Box>
  )
}

export default AddAvatar
