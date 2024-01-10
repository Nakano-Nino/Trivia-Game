import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Sidenav from "./components/Sidenav"
import Sidemenu from "./pages/Sidemenu"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidemenu />}></Route>
    </Routes>
  )
}

export default App
