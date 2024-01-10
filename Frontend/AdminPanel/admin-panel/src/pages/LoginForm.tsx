// LoginForm.tsx
import React, { useState } from "react"
import { FaUser, FaLock } from "react-icons/fa"
import {
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react"
import Logo from "../components/Logo"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Proses login disini
    console.log("Logging in...", { username, password })
  }

  return (
    <Box>
      <Flex direction="column" align="center" justify="center" h="100%">
        <Logo />

        <form className="mt-1" onSubmit={handleLogin}>
          <FormControl mb="4">
            <FormLabel htmlFor="username" srOnly>
              Username
            </FormLabel>
            <Flex alignItems="center">
              <FaUser className="mr-2" />
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Flex>
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="password" srOnly>
              Password
            </FormLabel>
            <Flex alignItems="center">
              <FaLock className="mr-2" />
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Flex>
          </FormControl>

          <Button type="submit" colorScheme="blue" size="md">
            Login
          </Button>
        </form>
      </Flex>
    </Box>
  )
}

export default LoginForm
