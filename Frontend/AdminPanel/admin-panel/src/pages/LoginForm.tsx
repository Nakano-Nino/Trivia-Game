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
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      })

      console.log("Login successful:", response.data)
      localStorage.setItem("token", response.data.authorization.token)
      Swal.fire({
        icon: "success",
        title: "Login Success!",
        showConfirmButton: false,
        timer: 1500,
      })
      navigate("/avatar")
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || "An error occurred"
      )
    }
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
