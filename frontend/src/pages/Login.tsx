import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Auth } from "@/services/auth"

export default function Login() {
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("password")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const submit = async () => {
    try {
      setError(null)
      const res = await Auth.login(email, password)
      localStorage.setItem("token", res.token)
      navigate("/")
    } catch (err: any) {
      setError(err.message || String(err))
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24">
      <div className="rounded-2xl bg-white p-6 shadow-sm border">
        <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="grid gap-2">
          <label className="text-sm">Correo</label>
          <Input value={email} onChange={e=>setEmail(e.target.value)} />
          <label className="text-sm">Contraseña</label>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="flex justify-end mt-3">
            <Button onClick={submit}>Entrar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
