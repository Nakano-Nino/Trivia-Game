// RegisterForm.tsx
import React, { useState } from "react"
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"
import { Input, Button, Flex, FormControl, FormLabel } from "@chakra-ui/react"
import Logo from "../components/Logo"

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    // Proses registrasi disini
    console.log("Registering...", { username, email, password })
  }

  return (
    <Flex direction="column" alignItems="center" justify="center" h="100%">
      <Logo />

      <form className="mt-1" onSubmit={handleRegister}>
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
          <FormLabel htmlFor="email" srOnly>
            Email
          </FormLabel>
          <Flex alignItems="center">
            <FaEnvelope className="mr-2" />
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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

        <Button type="submit" colorScheme="green" size="md">
          Register
        </Button>
      </form>
    </Flex>
  )
}

export default RegisterForm
