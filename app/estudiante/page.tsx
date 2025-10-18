"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, BookOpen, Award } from "lucide-react"
import { usuarios, materias, secciones, inscripciones, calificaciones, periodos } from "@/lib/datos"

export default function EstudiantePage() {
  const router = useRouter()
  const [estudianteActual] = useState(usuarios.find((u) => u.id === "est1")!)

  // Obtener inscripciones del estudiante
  const misInscripciones = inscripciones.filter((i) => i.estudianteId === estudianteActual.id)
  const misSecciones = misInscripciones.map((i) => secciones.find((s) => s.id === i.seccionId)!)
  const misMaterias = misSecciones.map((s) => materias.find((m) => m.id === s.materiaId)!)

  // Obtener calificaciones
  const misCalificaciones = calificaciones.filter((c) => c.estudianteId === estudianteActual.id)

  // Calcular promedio
  const promedio =
    misCalificaciones.length > 0
      ? (misCalificaciones.reduce((sum, c) => sum + c.nota, 0) / misCalificaciones.length).toFixed(2)
      : "0.00"

  const descargarConstancia = () => {
    alert("Descargando constancia de estudio...")
  }

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActual")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={cerrarSesion} title="Cerrar Sesión">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-card-foreground">Portal del Estudiante</h1>
                <p className="text-sm text-muted-foreground">{estudianteActual.nombre}</p>
              </div>
            </div>
            <Button onClick={descargarConstancia} className="gap-2">
              <Download className="w-4 h-4" />
              Descargar Constancia
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Cédula</CardDescription>
              <CardTitle className="text-2xl">{estudianteActual.cedula}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Materias Inscritas</CardDescription>
              <CardTitle className="text-2xl">{misMaterias.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Promedio General</CardDescription>
              <CardTitle className="text-2xl">{promedio}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="horarios" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="horarios">Horarios</TabsTrigger>
            <TabsTrigger value="calificaciones">Calificaciones</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="horarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Mis Horarios
                </CardTitle>
                <CardDescription>Período actual: {periodos.find((p) => p.activo)?.nombre}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {misSecciones.map((seccion, index) => {
                  const materia = misMaterias[index]
                  return (
                    <div key={seccion.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{materia.nombre}</h3>
                          <p className="text-sm text-muted-foreground">
                            {materia.codigo} - Sección {seccion.codigo}
                          </p>
                        </div>
                        <Badge variant="secondary">{materia.creditos} créditos</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        {seccion.horario}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calificaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Mis Calificaciones
                </CardTitle>
                <CardDescription>Notas por lapso del período actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {misMaterias.map((materia) => {
                    const notasMateria = misCalificaciones.filter((c) => c.materiaId === materia.id)
                    return (
                      <div key={materia.id} className="border border-border rounded-lg p-4">
                        <h3 className="font-semibold text-foreground mb-3">{materia.nombre}</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((lapso) => {
                            const nota = notasMateria.find((n) => n.lapso === lapso)
                            return (
                              <div key={lapso} className="text-center">
                                <p className="text-sm text-muted-foreground mb-1">Lapso {lapso}</p>
                                <p
                                  className={`text-2xl font-bold ${nota ? (nota.nota >= 10 ? "text-primary" : "text-destructive") : "text-muted-foreground"}`}
                                >
                                  {nota ? nota.nota : "-"}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial Académico</CardTitle>
                <CardDescription>Resumen de tu trayectoria académica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Total de materias cursadas</span>
                    <span className="font-semibold text-foreground">{misMaterias.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Créditos acumulados</span>
                    <span className="font-semibold text-foreground">
                      {misMaterias.reduce((sum, m) => sum + m.creditos, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Promedio general</span>
                    <span className="font-semibold text-foreground">{promedio}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Estado académico</span>
                    <Badge variant="default">Regular</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
