"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registrarUsuario } from "@/lib/autenticacion"
import { GraduationCap } from "lucide-react"

export default function PaginaRegistro() {
  const router = useRouter()
  const [cedula, setCedula] = useState("")
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")
  const [tipo, setTipo] = useState<"estudiante" | "profesor" | "administrador">("estudiante")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    // Validaciones
    if (!cedula || !nombre || !email || !contrasena || !confirmarContrasena) {
      setError("Por favor complete todos los campos")
      setCargando(false)
      return
    }

    if (cedula.length < 7 || cedula.length > 8) {
      setError("La cédula debe tener entre 7 y 8 dígitos")
      setCargando(false)
      return
    }

    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setCargando(false)
      return
    }

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden")
      setCargando(false)
      return
    }

    if (!email.includes("@")) {
      setError("Por favor ingrese un email válido")
      setCargando(false)
      return
    }

    // Intentar registrar
    const exito = registrarUsuario({
      cedula,
      nombre,
      email,
      tipo,
      contrasena,
    })

    if (exito) {
      // Guardar sesión automáticamente
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify({
          cedula,
          nombre,
          email,
          tipo,
        }),
      )

      // Redirigir según el tipo
      switch (tipo) {
        case "estudiante":
          router.push("/estudiante")
          break
        case "profesor":
          router.push("/profesor")
          break
        case "administrador":
          router.push("/administracion")
          break
      }
    } else {
      setError("Ya existe un usuario con esa cédula")
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sistema Académico</h1>
          <p className="text-muted-foreground">Instituto Universitario Jesús Obrero</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Complete el formulario para registrarse en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={manejarEnvio} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Usuario</Label>
                <Select value={tipo} onValueChange={(value: any) => setTipo(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula de Identidad</Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value.replace(/\D/g, ""))}
                  disabled={cargando}
                  maxLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={cargando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@iujo.edu.ve"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={cargando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrasena">Contraseña</Label>
                <Input
                  id="contrasena"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={cargando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar">Confirmar Contraseña</Label>
                <Input
                  id="confirmar"
                  type="password"
                  placeholder="Repita su contraseña"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  disabled={cargando}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={cargando}>
                {cargando ? "Registrando..." : "Crear Cuenta"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tiene una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
