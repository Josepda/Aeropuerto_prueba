export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-4 shadow-sm border">
        <div className="text-sm text-muted-foreground">Aeropuertos</div>
        <div className="text-3xl font-semibold">—</div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm border">
        <div className="text-sm text-muted-foreground">Rutas</div>
        <div className="text-3xl font-semibold">—</div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm border">
        <div className="text-sm text-muted-foreground">Estado del sistema</div>
        <div className="text-sm mt-2">Configura <code>VITE_API_URL</code> en <code>.env</code></div>
      </div>
    </div>
  )
}
