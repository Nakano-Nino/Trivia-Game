import "./App.css"
import { Route, Routes } from "react-router-dom"
import Sidemenu from "./pages/Sidemenu"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidemenu />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
    </Routes>
  )
}

export default App
