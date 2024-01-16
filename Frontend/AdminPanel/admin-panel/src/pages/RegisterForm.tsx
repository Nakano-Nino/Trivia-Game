// RegisterForm.tsx
import React, { useState } from "react"
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"
import {
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Box,
} from "@chakra-ui/react"
import Logo from "../components/Logo"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        username,
        email,
        password,
      })

      console.log("Registration successful:", response.data)
      navigate("/login")
      // Handle redirection or other actions upon successful registration
    } catch (error: any) {
      console.error("Registration failed:", error.response.data.message)
      // Handle error, e.g., display error message to the user
    }
    console.log("Registering...", { name, username, email, password })
  }

  return (
    <Box
      border={"1px"}
      borderColor="white.200"
      p={1}
      backgroundColor={"purple.100"}
      w={"30rem"}
      borderRadius={10}
      boxShadow={"xl"}
      alignContent={"center"}
      alignSelf={"center"}
      verticalAlign={"middle"}
      justifyContent={"center"}
      marginStart={"22rem"}
    >
      <Flex direction="column" alignItems="center" justify="center" h="100%">
        <Logo />
        <form className="mt-1" onSubmit={handleRegister}>
          <FormControl mb="4">
            <FormLabel htmlFor="username" srOnly>
              Name
            </FormLabel>
            <Flex alignItems="center">
              <FaUser className="mr-2" />
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                border={"1px solid black"}
              />
            </Flex>
          </FormControl>
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
                border={"1px solid black"}
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
                border={"1px solid black"}
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
                border={"1px solid black"}
              />
            </Flex>
          </FormControl>

          <Button type="submit" colorScheme="purple" size="md" width={"60%"}>
            Register
          </Button>
          <Text>
            Already have an account?{" "}
            <Link to="/" className="hover:text-blue-500">
              Login
            </Link>
          </Text>
        </form>
      </Flex>
    </Box>
  )
}

export default RegisterForm
