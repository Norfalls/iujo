"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Settings } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActual")
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado)
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
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">Sistema de Gestión Académica</h1>
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Bienvenido al Portal Académico</h2>
          <p className="text-lg text-muted-foreground text-pretty">Seleccione su perfil para acceder al sistema</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/login" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Estudiante</CardTitle>
                <CardDescription className="text-base">
                  Consulta tus materias, horarios y calificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Horarios y materias</li>
                  <li>• Calificaciones por lapso</li>
                  <li>• Constancias de estudio</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/login" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Profesor</CardTitle>
                <CardDescription className="text-base">Gestiona tus clases, notas y asistencias</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Carga de notas</li>
                  <li>• Control de asistencias</li>
                  <li>• Planificación académica</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/login" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Administración</CardTitle>
                <CardDescription className="text-base">Administra usuarios, carreras y períodos</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Gestión de usuarios</li>
                  <li>• Carreras y materias</li>
                  <li>• Períodos académicos</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Sistema de Gestión Académica - IUJO © 2025</p>
        </div>
      </footer>
    </div>
  )
}
