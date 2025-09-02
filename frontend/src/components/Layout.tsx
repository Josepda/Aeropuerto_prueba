import { Link, NavLink, Outlet } from "react-router-dom"
import { Plane, Map, PlusCircle, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Layout() {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="bg-white border-r p-4">
        <div className="flex items-center gap-2 mb-6">
          <Plane className="h-6 w-6" />
          <span className="font-semibold">Aeropuertos Pro</span>
        </div>
        <nav className="space-y-1">
          <NavLink to="/" end className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>
            <LayoutGrid className="h-4 w-4"/> Panel
          </NavLink>
          <NavLink to="/aeropuertos" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>
            <Plane className="h-4 w-4"/> Aeropuertos
          </NavLink>
          <NavLink to="/rutas" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>
            <Map className="h-4 w-4"/> Rutas
          </NavLink>
        </nav>
        <div className="mt-6">
          <Link to="/aeropuertos/nuevo"><Button className="w-full"><PlusCircle className="h-4 w-4 mr-2"/>Nuevo Aeropuerto</Button></Link>
        </div>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
