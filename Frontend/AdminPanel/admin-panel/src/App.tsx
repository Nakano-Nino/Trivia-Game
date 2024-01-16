import "./App.css"
import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"
import AddAvatar from "./pages/AddAvatar"
import AddQuestion from "./pages/AddQuestion"
import AddDiamond from "./pages/AddDiamonds"
import Dashboard from "./pages/Dashboard"
import { PrivateRoute } from "./privateRoute/privateRoute"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/avatar" element={<AddAvatar />}></Route>
        <Route path="/question" element={<AddQuestion />}></Route>
        <Route path="/diamond" element={<AddDiamond />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  )
}
export default App
