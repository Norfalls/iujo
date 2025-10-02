"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, FileText, CheckCircle, XCircle } from "lucide-react"
import { usuarios, materias, secciones, calificaciones, silabos } from "@/lib/datos"

export default function ProfesorPage() {
  const [profesorActual] = useState(usuarios.find((u) => u.id === "prof1")!)
  const [notaSeleccionada, setNotaSeleccionada] = useState("")
  const [lapsoSeleccionado, setLapsoSeleccionado] = useState("1")

  // Obtener materias del profesor
  const misMaterias = materias.filter((m) => m.profesorId === profesorActual.id)
  const misSeccionesIds = misMaterias.map((m) => m.id)
  const misSecciones = secciones.filter((s) => misSeccionesIds.includes(s.materiaId))

  // Obtener estudiantes
  const misEstudiantes = misSecciones.flatMap((s) =>
    s.estudiantesInscritos.map((estId) => ({
      estudiante: usuarios.find((u) => u.id === estId)!,
      seccionId: s.id,
      materiaId: s.materiaId,
    })),
  )

  const cargarNota = (estudianteId: string, materiaId: string) => {
    if (!notaSeleccionada || isNaN(Number(notaSeleccionada))) {
      alert("Por favor ingrese una nota válida")
      return
    }
    alert(`Nota ${notaSeleccionada} cargada para el estudiante en lapso ${lapsoSeleccionado}`)
    setNotaSeleccionada("")
  }

  const registrarAsistencia = (estudianteId: string, seccionId: string, presente: boolean) => {
    alert(`Asistencia registrada: ${presente ? "Presente" : "Ausente"}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-card-foreground">Portal del Profesor</h1>
              <p className="text-sm text-muted-foreground">{profesorActual.nombre}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Materias Asignadas</CardDescription>
              <CardTitle className="text-2xl">{misMaterias.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Estudiantes</CardDescription>
              <CardTitle className="text-2xl">{misEstudiantes.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Secciones</CardDescription>
              <CardTitle className="text-2xl">{misSecciones.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="estudiantes" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
            <TabsTrigger value="notas">Notas</TabsTrigger>
            <TabsTrigger value="silabos">Sílabos</TabsTrigger>
          </TabsList>

          <TabsContent value="estudiantes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Lista de Estudiantes
                </CardTitle>
                <CardDescription>Estudiantes inscritos en tus materias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {misMaterias.map((materia) => {
                    const seccion = misSecciones.find((s) => s.materiaId === materia.id)
                    const estudiantesMateria = misEstudiantes.filter((e) => e.materiaId === materia.id)

                    return (
                      <div key={materia.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{materia.nombre}</h3>
                            <p className="text-sm text-muted-foreground">
                              {materia.codigo} - Sección {seccion?.codigo}
                            </p>
                          </div>
                          <Badge>{estudiantesMateria.length} estudiantes</Badge>
                        </div>

                        <div className="space-y-2">
                          {estudiantesMateria.map(({ estudiante, seccionId }) => (
                            <div
                              key={estudiante.id}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded"
                            >
                              <div>
                                <p className="font-medium text-foreground">{estudiante.nombre}</p>
                                <p className="text-sm text-muted-foreground">{estudiante.cedula}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => registrarAsistencia(estudiante.id, seccionId, true)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Presente
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => registrarAsistencia(estudiante.id, seccionId, false)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Ausente
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Carga de Notas</CardTitle>
                <CardDescription>Registra las calificaciones de tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {misMaterias.map((materia) => {
                    const estudiantesMateria = misEstudiantes.filter((e) => e.materiaId === materia.id)

                    return (
                      <div key={materia.id} className="border border-border rounded-lg p-4">
                        <h3 className="font-semibold text-foreground mb-4">{materia.nombre}</h3>

                        <div className="mb-4">
                          <Label htmlFor={`lapso-${materia.id}`}>Seleccionar Lapso</Label>
                          <select
                            id={`lapso-${materia.id}`}
                            className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground"
                            value={lapsoSeleccionado}
                            onChange={(e) => setLapsoSeleccionado(e.target.value)}
                          >
                            <option value="1">Lapso 1</option>
                            <option value="2">Lapso 2</option>
                            <option value="3">Lapso 3</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          {estudiantesMateria.map(({ estudiante }) => {
                            const notaActual = calificaciones.find(
                              (c) =>
                                c.estudianteId === estudiante.id &&
                                c.materiaId === materia.id &&
                                c.lapso === Number(lapsoSeleccionado),
                            )

                            return (
                              <div key={estudiante.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                                <div className="flex-1">
                                  <p className="font-medium text-foreground">{estudiante.nombre}</p>
                                  {notaActual && (
                                    <p className="text-sm text-muted-foreground">Nota actual: {notaActual.nota}</p>
                                  )}
                                </div>
                                <Input
                                  type="number"
                                  min="0"
                                  max="20"
                                  placeholder="Nota"
                                  className="w-24"
                                  value={notaSeleccionada}
                                  onChange={(e) => setNotaSeleccionada(e.target.value)}
                                />
                                <Button size="sm" onClick={() => cargarNota(estudiante.id, materia.id)}>
                                  Guardar
                                </Button>
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

          <TabsContent value="silabos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Planificación y Sílabos
                </CardTitle>
                <CardDescription>Gestiona el contenido de tus materias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {misMaterias.map((materia) => {
                  const silabo = silabos.find((s) => s.materiaId === materia.id)

                  return (
                    <div key={materia.id} className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-4">{materia.nombre}</h3>

                      {silabo ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-muted-foreground">Contenido</Label>
                            <p className="mt-1 text-foreground">{silabo.contenido}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Objetivos</Label>
                            <ul className="mt-1 space-y-1">
                              {silabo.objetivos.map((obj, i) => (
                                <li key={i} className="text-foreground">
                                  • {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`contenido-${materia.id}`}>Contenido</Label>
                            <Textarea
                              id={`contenido-${materia.id}`}
                              placeholder="Describe el contenido de la materia..."
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`objetivos-${materia.id}`}>Objetivos</Label>
                            <Textarea
                              id={`objetivos-${materia.id}`}
                              placeholder="Lista los objetivos de aprendizaje..."
                              className="mt-1"
                            />
                          </div>
                          <Button>Guardar Sílabo</Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
