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
  Text,
} from "@chakra-ui/react"
import Logo from "../components/Logo"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      Swal.fire({
        title: "Wait a moment",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        Swal.showLoading()
      })

      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      })
      Swal.fire({
        icon: "success",
        title: "Login Success!",
        showConfirmButton: false,
        timer: 1500,
      })
      console.log("Login successful:", response.data)
      localStorage.setItem("token", response.data.authorization.token)
      navigate("/dashboard")
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || "An error occurred"
      )
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "An error occurred",
      })
    } finally {
      Swal.close()
      setLoading(false)
    }
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
      marginTop={"4rem"}
    >
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
                border={"1px solid black"}
                backgroundColor={"purple.100"}
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
                backgroundColor={"white-100"}
              />
            </Flex>
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            size="md"
            width={"60%"}
            disabled={loading}
          >
            {loading ? "Login In..." : "Login"}
          </Button>
          <Text>
            Don't have an account?{" "}
            <Link to="/register" className="hover:text-blue-500">
              Register
            </Link>
          </Text>
        </form>
      </Flex>
    </Box>
  )
}

export default LoginForm
