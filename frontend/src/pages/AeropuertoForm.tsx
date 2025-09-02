
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Aeropuertos, type Aeropuerto } from "@/services/aeropuertos"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  city: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  status: z.enum(["open","closed","maintenance"]).optional(),
})

type FormValues = z.infer<typeof schema>

export default function AeropuertoForm() {
  const { id } = useParams()
  const [sp] = useSearchParams()
  const view = sp.get("view") === "1"
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name:"", code:"", city:"", country:"", timezone:"", status:"open" }
  })

  useEffect(() => {
    if (id) {
      Aeropuertos.get(String(id)).then(data => {
        setValue("name", data.name as any)
        setValue("code", data.code as any)
        setValue("city", data.city as any)
        setValue("country", data.country as any)
        setValue("timezone", data.timezone as any)
        setValue("status", data.status as any)
      }).catch(console.error)
    }
  }, [id])

  const onSubmit = async (values: FormValues) => {
    if (id) await Aeropuertos.update(String(id), values as any)
    else await Aeropuertos.create(values as any)
    navigate("/aeropuertos")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{id ? (view ? "Ver aeropuerto" : "Editar aeropuerto") : "Nuevo aeropuerto"}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm border max-w-3xl">
        <div className="grid gap-2">
          <Label>Nombre</Label>
          <Input disabled={view} {...register("name")} />
          {errors.name && <span className="text-red-600 text-xs">{errors.name.message}</span>}
        </div>
        <div className="grid gap-2">
          <Label>Código</Label>
          <Input disabled={view} {...register("code")} />
          {errors.code && <span className="text-red-600 text-xs">{errors.code.message}</span>}
        </div>
        <div className="grid gap-2">
          <Label>Ciudad</Label>
          <Input disabled={view} {...register("city")} />
        </div>
        <div className="grid gap-2">
          <Label>País</Label>
          <Input disabled={view} {...register("country")} />
        </div>
        <div className="grid gap-2">
          <Label>Zona horaria</Label>
          <Input disabled={view} {...register("timezone")} placeholder="e.g. America/Bogota" />
        </div>
        <div className="grid gap-2">
          <Label>Estado</Label>
          <Input disabled={view} {...register("status")} placeholder="open | closed | maintenance" />
        </div>
        {!view && (
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => history.back()}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>{id ? "Guardar cambios" : "Crear"}</Button>
          </div>
        )}
      </form>
    </div>
  )
}
