// src/components/Header.tsx
import React from "react"
import { Box, Heading, Image } from "@chakra-ui/react"

interface HeaderProps {
  title: string
  description: string
}

const HeaderPanel: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <Box bg="blue.500" color="white" p={4} mb={4}>
      <Image src="../assets/logo1.png" />
      <Heading as="h1" size="xl" className="w-full">
        {title}
      </Heading>
      <p>{description}</p>
    </Box>
  )
}

export default HeaderPanel
