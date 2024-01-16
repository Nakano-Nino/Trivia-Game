// src/App.tsx
import React from "react"
import { Box } from "@chakra-ui/react"

import HeaderPanel from "../components/Header"
import FormUpload from "./FormUpload"
const AddAvatar: React.FC = () => {
  const handleCreate = (data: any) => {
    // Lakukan apa yang diperlukan ketika data dibuat
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
          <FormUpload onCreate={handleCreate} />
        </Box>
      </div>
    </Box>
  )
}

export default AddAvatar
