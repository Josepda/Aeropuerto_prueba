import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"
import { Rutas } from "@/services/rutas"
import { Aeropuertos } from "@/services/aeropuertos"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({
  id_aeropuerto_origen: z.coerce.number().int().positive(),
  id_aeropuerto_destino: z.coerce.number().int().positive(),
  id_aeropuerto_origen: z.coerce.number().int().positive(),
  id_aeropuerto_destino: z.coerce.number().int().positive(),
  cantidad_km: z.coerce.number().nonnegative(),
  precio: z.coerce.number().nonnegative()
})

type FormValues = z.infer<typeof schema>

export default function RutaForm() {
  const [airports, setAirports] = useState<any[]>([]);

  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { id_aeropuerto_origen: 0, id_aeropuerto_destino: 0, cantidad_km: 0, precio: 0 }
  })

  useEffect(() => {
    Aeropuertos.list().then(list => setAirports(list)).catch(console.error);
  }, []);

  useEffect(() => {
    if (id) {
      Rutas.get(Number(id)).then(data => {
        (Object.keys(data) as (keyof FormValues)[]).forEach(k => {
          // @ts-ignore
          if (data[k] !== undefined) setValue(k as any, data[k] as any)
        })
      }).catch(console.error)
    }
  }, [id])

  const onSubmit = async (values: FormValues) => {
    if (id) await Rutas.update(Number(id), values)
    else await Rutas.create(values)
    navigate("/rutas")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{id ? "Editar ruta" : "Nueva ruta"}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm border max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Id Aeropuerto Origen</Label>
            <select {...register("id_aeropuerto_origen", { valueAsNumber: true })} className="flex h-10 w-full rounded-2xl border border-input bg-background px-3 text-sm">
              <option value={0}>Seleccione origen</option>
              {airports.map(a => <option key={a._id} value={a._id}>{a.code} — {a.name}</option>)}
            </select>
            {errors.id_aeropuerto_origen && <span className="text-red-600 text-xs">{errors.id_aeropuerto_origen.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label>Id Aeropuerto Destino</Label>
            <select {...register("id_aeropuerto_destino", { valueAsNumber: true })} className="flex h-10 w-full rounded-2xl border border-input bg-background px-3 text-sm">
              <option value={0}>Seleccione destino</option>
              {airports.map(a => <option key={a._id} value={a._id}>{a.code} — {a.name}</option>)}
            </select>
            {errors.id_aeropuerto_destino && <span className="text-red-600 text-xs">{errors.id_aeropuerto_destino.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Kilómetros</Label>
            <Input type="number" min={0} step="0.01" {...register("cantidad_km", { valueAsNumber: true })} />
            {errors.cantidad_km && <span className="text-red-600 text-xs">{errors.cantidad_km.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label>Precio</Label>
            <Input type="number" min={0} step="0.01" {...register("precio", { valueAsNumber: true })} />
            {errors.precio && <span className="text-red-600 text-xs">{errors.precio.message}</span>}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={() => history.back()}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>{id ? "Guardar cambios" : "Crear"}</Button>
        </div>
      </form>
    </div>
  )
}
