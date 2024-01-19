import { Box } from "@chakra-ui/react"
import HeaderPanel from "../components/Header"

export default function Dashboard() {
  return (
    <Box border={"1px"} borderRadius={10} h={"80vh"}>
      <HeaderPanel
        title="Admin Panel"
        description="All in one web for manage Celeb Minds APP"
      />
      <h2>Welcome as Admin!</h2>
      <p>
        Thank you for using our Admin Panel. Feel free to manage and monitor the
        system as needed.
      </p>
    </Box>
  )
}
