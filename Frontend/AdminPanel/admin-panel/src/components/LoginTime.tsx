// src/components/LoginTime.tsx
import React, { useState, useEffect } from "react"

interface LoginTimeProps {
  username: string
}

const LoginTime: React.FC<LoginTimeProps> = ({}) => {
  const [loginTime, setLoginTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoginTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const formattedTime = loginTime.toLocaleTimeString()

  return (
    <div>
      <p>Login Time: {formattedTime}</p>
    </div>
  )
}

export default LoginTime
