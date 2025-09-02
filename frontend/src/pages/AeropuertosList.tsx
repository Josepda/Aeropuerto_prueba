
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Aeropuertos, type Aeropuerto } from "@/services/aeropuertos"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table"

export default function AeropuertosList() {
  const [rows, setRows] = useState<Aeropuerto[]>([])
  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Aeropuertos.list(q).then((res) => { setRows(res) }).catch((e) => console.error(e)).finally(()=>setLoading(false))
  }, [q])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Aeropuertos</h1>
        <Link to="/aeropuertos/nuevo"><Button>Nuevo</Button></Link>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm border">
        <div className="flex items-center gap-2 mb-3">
          <Input placeholder="Buscar por nombre, código o ciudad..." value={q} onChange={e=>setQ(e.target.value)} />
          <Button variant="secondary" onClick={()=>{}}>Buscar</Button>
        </div>
        <Table>
          <THead>
            <TR>
              <TH>Nombre</TH>
              <TH>Código</TH>
              <TH>Ciudad</TH>
              <TH>País</TH>
              <TH>Zona horaria</TH>
              <TH>Estado</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {rows.map(a => (
              <TR key={a._id}>
                <TD>{a.name}</TD>
                <TD>{a.code}</TD>
                <TD>{a.city || "-"}</TD>
                <TD>{a.country || "-"}</TD>
                <TD>{a.timezone || "-"}</TD>
                <TD>{a.status}</TD>
                <TD className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/aeropuertos/${a._id}`}><Button variant="outline">Editar</Button></Link>
                    <Link to={`/aeropuertos/${a._id}?view=1`}><Button variant="secondary">Ver</Button></Link>
                  </div>
                </TD>
              </TR>
            ))}
            {rows.length === 0 && (
              <TR><TD colSpan={7}>{loading ? "Cargando..." : "Sin resultados"}</TD></TR>
            )}
          </TBody>
        </Table>
      </div>
    </div>
  )
}
