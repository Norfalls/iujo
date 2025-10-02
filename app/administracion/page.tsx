"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, BookOpen, GraduationCap, Calendar, Plus, Pencil, Trash2 } from "lucide-react"
import { usuarios, materias, carreras, periodos, secciones } from "@/lib/datos"

export default function AdministracionPage() {
  const [adminActual] = useState(usuarios.find((u) => u.id === "admin1")!)
  const [mostrarFormUsuario, setMostrarFormUsuario] = useState(false)
  const [mostrarFormCarrera, setMostrarFormCarrera] = useState(false)
  const [mostrarFormMateria, setMostrarFormMateria] = useState(false)

  const totalEstudiantes = usuarios.filter((u) => u.tipo === "estudiante").length
  const totalProfesores = usuarios.filter((u) => u.tipo === "profesor").length
  const periodoActivo = periodos.find((p) => p.activo)

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
              <h1 className="text-xl font-semibold text-card-foreground">Panel de Administración</h1>
              <p className="text-sm text-muted-foreground">{adminActual.nombre}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Estudiantes</CardDescription>
              <CardTitle className="text-2xl">{totalEstudiantes}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Profesores</CardDescription>
              <CardTitle className="text-2xl">{totalProfesores}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Carreras</CardDescription>
              <CardTitle className="text-2xl">{carreras.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Materias</CardDescription>
              <CardTitle className="text-2xl">{materias.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="usuarios" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="carreras">Carreras</TabsTrigger>
            <TabsTrigger value="materias">Materias</TabsTrigger>
            <TabsTrigger value="periodos">Períodos</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Gestión de Usuarios
                    </CardTitle>
                    <CardDescription>Administra estudiantes, profesores y personal</CardDescription>
                  </div>
                  <Button onClick={() => setMostrarFormUsuario(!mostrarFormUsuario)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Usuario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mostrarFormUsuario && (
                  <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-4 text-foreground">Crear Nuevo Usuario</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input id="nombre" placeholder="Ej: Juan Pérez" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cedula">Cédula</Label>
                        <Input id="cedula" placeholder="Ej: 12345678" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" placeholder="Ej: juan@universidad.edu" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tipo">Tipo de Usuario</Label>
                        <select
                          id="tipo"
                          className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground"
                        >
                          <option value="estudiante">Estudiante</option>
                          <option value="profesor">Profesor</option>
                          <option value="administrador">Administrador</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button>Guardar Usuario</Button>
                      <Button variant="outline" onClick={() => setMostrarFormUsuario(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {usuarios.map((usuario) => (
                    <div
                      key={usuario.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{usuario.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {usuario.email} • {usuario.cedula}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            usuario.tipo === "estudiante"
                              ? "default"
                              : usuario.tipo === "profesor"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {usuario.tipo}
                        </Badge>
                        <Button size="icon" variant="ghost">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carreras" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Gestión de Carreras
                    </CardTitle>
                    <CardDescription>Administra las carreras disponibles</CardDescription>
                  </div>
                  <Button onClick={() => setMostrarFormCarrera(!mostrarFormCarrera)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Carrera
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mostrarFormCarrera && (
                  <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-4 text-foreground">Crear Nueva Carrera</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombreCarrera">Nombre de la Carrera</Label>
                        <Input id="nombreCarrera" placeholder="Ej: Ingeniería en Sistemas" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="codigoCarrera">Código</Label>
                        <Input id="codigoCarrera" placeholder="Ej: ISI" className="mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button>Guardar Carrera</Button>
                      <Button variant="outline" onClick={() => setMostrarFormCarrera(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {carreras.map((carrera) => (
                    <div key={carrera.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{carrera.nombre}</h3>
                          <p className="text-sm text-muted-foreground">Código: {carrera.codigo}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {materias.filter((m) => m.carreraId === carrera.id).length} materias
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materias" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Gestión de Materias
                    </CardTitle>
                    <CardDescription>Administra las materias y secciones</CardDescription>
                  </div>
                  <Button onClick={() => setMostrarFormMateria(!mostrarFormMateria)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Materia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mostrarFormMateria && (
                  <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-4 text-foreground">Crear Nueva Materia</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombreMateria">Nombre de la Materia</Label>
                        <Input id="nombreMateria" placeholder="Ej: Programación I" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="codigoMateria">Código</Label>
                        <Input id="codigoMateria" placeholder="Ej: ISI-101" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="carreraMateria">Carrera</Label>
                        <select
                          id="carreraMateria"
                          className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground"
                        >
                          {carreras.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="creditos">Créditos</Label>
                        <Input id="creditos" type="number" placeholder="Ej: 3" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="profesorMateria">Profesor Asignado</Label>
                        <select
                          id="profesorMateria"
                          className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground"
                        >
                          {usuarios
                            .filter((u) => u.tipo === "profesor")
                            .map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.nombre}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button>Guardar Materia</Button>
                      <Button variant="outline" onClick={() => setMostrarFormMateria(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {materias.map((materia) => {
                    const carrera = carreras.find((c) => c.id === materia.carreraId)
                    const profesor = usuarios.find((u) => u.id === materia.profesorId)
                    const seccionesMateria = secciones.filter((s) => s.materiaId === materia.id)

                    return (
                      <div key={materia.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{materia.nombre}</h3>
                              <Badge variant="secondary">{materia.creditos} créditos</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {materia.codigo} • {carrera?.nombre}
                            </p>
                            <p className="text-sm text-muted-foreground">Profesor: {profesor?.nombre}</p>
                            <p className="text-sm text-muted-foreground">Secciones: {seccionesMateria.length}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="periodos" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Control de Períodos Académicos
                    </CardTitle>
                    <CardDescription>Gestiona los períodos lectivos</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Período
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {periodos.map((periodo) => (
                    <div key={periodo.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{periodo.nombre}</h3>
                            {periodo.activo && <Badge>Activo</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Inicio: {new Date(periodo.fechaInicio).toLocaleDateString("es-ES")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Fin: {new Date(periodo.fechaFin).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
