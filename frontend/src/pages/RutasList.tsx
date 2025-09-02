import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Rutas, type Ruta } from "@/services/rutas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table"

export default function RutasList() {
  const [rows, setRows] = useState<Ruta[]>([])
  const [total, setTotal] = useState(0)
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    Rutas.list(q, page, limit)
      .then((res) => { setRows(res.data); setTotal(res.total) })
      .catch((e) => console.error(e))
  }, [q, page])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Rutas</h1>
        <Link to="/rutas/nueva"><Button>Nueva</Button></Link>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm border">
        <div className="flex items-center gap-2 mb-3">
          <Input placeholder="Buscar por origen/destino..." value={q} onChange={e=>setQ(e.target.value)} />
          <Button variant="secondary" onClick={()=>setPage(1)}>Buscar</Button>
        </div>
        <Table>
          <THead>
            <TR>
              <TH>Origen</TH>
              <TH>Destino</TH>
              <TH>Kilómetros</TH>
              <TH>Precio</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {rows.map(r => (
              <TR key={r.id_ruta}>
                <TD>{r.id_aeropuerto_origen}</TD>
                <TD>{r.id_aeropuerto_destino}</TD>
                <TD>{r.cantidad_km}</TD>
                <TD>${r.precio.toLocaleString()}</TD>
                <TD className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/rutas/${r.id_ruta}`}><Button variant="outline">Editar</Button></Link>
                  </div>
                </TD>
              </TR>
            ))}
            {rows.length === 0 && (
              <TR><TD colSpan={5}>Sin resultados</TD></TR>
            )}
          </TBody>
        </Table>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-muted-foreground">Total: {total}</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={()=>setPage(p=>Math.max(1, p-1))}>Anterior</Button>
            <div className="text-sm">Página {page} de {totalPages}</div>
            <Button variant="outline" onClick={()=>setPage(p=>Math.min(totalPages, p+1))}>Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
