import "./App.css"
import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"
import AddAvatar from "./pages/AddAvatar"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
      <Route path="/avatar" element={<AddAvatar />}></Route>
    </Routes>
  )
}
export default App
