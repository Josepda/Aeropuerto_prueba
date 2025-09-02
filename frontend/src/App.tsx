import { Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import Dashboard from "@/pages/Dashboard"
import Login from "@/pages/Login"
import AeropuertosList from "@/pages/AeropuertosList"
import AeropuertoForm from "@/pages/AeropuertoForm"
import RutasList from "@/pages/RutasList"
import RutaForm from "@/pages/RutaForm"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="aeropuertos">
          <Route index element={<AeropuertosList/>}/>
          <Route path="nuevo" element={<AeropuertoForm/>}/>
          <Route path=":id" element={<AeropuertoForm/>}/>
        </Route>
        <Route path="rutas">
          <Route index element={<RutasList/>}/>
          <Route path="nueva" element={<RutaForm/>}/>
          <Route path=":id" element={<RutaForm/>}/>
        </Route>
      </Route>
    </Routes>
  )
}
