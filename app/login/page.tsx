"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { verificarCredenciales } from "@/lib/autenticacion"
import { GraduationCap } from "lucide-react"

export default function PaginaLogin() {
  const router = useRouter()
  const [cedula, setCedula] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    // Validar campos vacíos
    if (!cedula || !contrasena) {
      setError("Por favor complete todos los campos")
      setCargando(false)
      return
    }

    // Verificar credenciales
    const usuario = verificarCredenciales(cedula, contrasena)

    if (usuario) {
      // Guardar sesión en localStorage
      localStorage.setItem("usuarioActual", JSON.stringify(usuario))

      // Redirigir según el tipo de usuario
      switch (usuario.tipo) {
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
      setError("Cédula o contraseña incorrecta")
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
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={manejarEnvio} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula de Identidad</Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  disabled={cargando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrasena">Contraseña</Label>
                <Input
                  id="contrasena"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={cargando}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={cargando}>
                {cargando ? "Ingresando..." : "Ingresar"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿No tiene una cuenta?{" "}
                <Link href="/registro" className="text-primary hover:underline font-medium">
                  Registrarse aquí
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Para pruebas use:</p>
          <p className="mt-1">Estudiante: 26644945 / estudiante123</p>
          <p>Profesor: 34567890 / profesor123</p>
          <p>Admin: 56789012 / admin123</p>
        </div>
      </div>
    </div>
  )
}
