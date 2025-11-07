"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, GraduationCap, FileText, Users, ArrowLeftRight } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface Evento {
  id: string
  titulo: string
  descripcion: string
  inicio: string // ISO date
  fin: string
  color: string
  icon: React.ReactNode
  tipo: "inscripcion" | "retiro" | "corte" | "graduacion" | "resumen"
}

interface HorarioInscripcion {
  carrera: string
  inicioIE: string
  reinIE: string
  finIE: string
  inicioRE: string
  reinRE: string
  finRE: string
}

export default function CalendarioAcademico() {
  const [periodo, setPeriodo] = useState("2025")
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null)

  // Datos de eventos basados en la imagen (período 2025)
  const eventos: Evento[] = [
    { id: "inicio-periodo", titulo: "Inicio de Período", descripcion: "Comienzo del semestre académico.", inicio: "2025-09-01", fin: "2025-09-01", color: "bg-blue-500", icon: <Calendar className="w-4 h-4" />, tipo: "inscripcion" },
    { id: "inclusion-materias", titulo: "Inclusión de Materias", descripcion: "Período para agregar materias.", inicio: "2025-09-19", fin: "2025-12-26", color: "bg-green-500", icon: <Users className="w-4 h-4" />, tipo: "inscripcion" },
    { id: "retiro-materias", titulo: "Retiro de Materias", descripcion: "Período para retirar materias.", inicio: "2025-09-19", fin: "2025-12-26", color: "bg-yellow-500", icon: <ArrowLeftRight className="w-4 h-4" />, tipo: "retiro" },
    { id: "1er-corte", titulo: "1er Corte", descripcion: "Evaluación intermedia.", inicio: "2025-10-13", fin: "2025-10-13", color: "bg-orange-500", icon: <Clock className="w-4 h-4" />, tipo: "corte" },
    { id: "2do-corte", titulo: "2do Corte", descripcion: "Evaluación intermedia.", inicio: "2025-10-14", fin: "2025-10-16", color: "bg-orange-500", icon: <Clock className="w-4 h-4" />, tipo: "corte" },
    { id: "3er-corte", titulo: "3er Corte", descripcion: "Evaluación final.", inicio: "2025-11-17", fin: "2025-11-20", color: "bg-orange-500", icon: <Clock className="w-4 h-4" />, tipo: "corte" },
    { id: "sustitutiva", titulo: "Sustitutiva", descripcion: "Exámenes sustitutivos.", inicio: "2025-12-21", fin: "2025-12-14", color: "bg-red-500", icon: <FileText className="w-4 h-4" />, tipo: "corte" },
    { id: "graduacion", titulo: "Graduación", descripcion: "Ceremonia de graduación.", inicio: "2025-04-12", fin: "2025-04-12", color: "bg-purple-500", icon: <GraduationCap className="w-4 h-4" />, tipo: "graduacion" },
    { id: "resumen-academico", titulo: "Emisión de Resumen Académico", descripcion: "Descarga de resúmenes finales.", inicio: "2025-01-15", fin: "2025-01-26", color: "bg-indigo-500", icon: <FileText className="w-4 h-4" />, tipo: "resumen" },
  ]

  // Horarios de inscripción (de la tabla en la imagen)
  const horarios: HorarioInscripcion[] = [
    { carrera: "Informática", inicioIE: "19-01-2026 06:00", reinIE: "19-01-2026 09:00", finIE: "23-01-2026 07:00", inicioRE: "19-01-2026 06:00", reinRE: "19-01-2026 09:00", finRE: "23-01-2026 07:00" },
    { carrera: "Educación Integral", inicioIE: "19-01-2026 06:00", reinIE: "19-01-2026 09:00", finIE: "23-01-2026 07:00", inicioRE: "19-01-2026 06:00", reinRE: "19-01-2026 09:00", finRE: "23-01-2026 07:00" },
    // Agrega más...
  ]

  const handleEventoClick = (evento: Evento) => {
    setEventoSeleccionado(evento)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Sistema de Calendariación Académica
            </CardTitle>
            <div className="flex items-center gap-4">
              <p className="text-blue-100">Bienvenido, Daniel Eduardo Araujo Marcano</p>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-32 bg-white text-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Timeline Principal */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Período: 01/09/2025 - 01/02/2026</h3>
              <Button variant="outline" size="sm">Ver Detalles</Button>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
              <div className="flex space-x-2 p-4 min-w-max">
                {eventos.map((evento) => {
                  const inicio = parseISO(evento.inicio)
                  const fin = parseISO(evento.fin)
                  return (
                    <TooltipProvider key={evento.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Dialog open={eventoSeleccionado?.id === evento.id} onOpenChange={() => setEventoSeleccionado(null)}>
                            <DialogTrigger asChild>
                              <div
                                onClick={() => handleEventoClick(evento)}
                                className={`relative flex flex-col items-center min-w-[200px] cursor-pointer group`}
                              >
                                <div className={`w-full h-2 rounded-full ${evento.color} mb-2 group-hover:scale-105 transition-transform`} />
                                <div className={`px-3 py-2 bg-white rounded-lg shadow-md border border-gray-200 w-full group-hover:shadow-lg transition-shadow`}>
                                  <div className="flex items-center gap-2 mb-1">
                                    {evento.icon}
                                    <span className="font-medium text-sm">{evento.titulo}</span>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {format(inicio, "dd/MM/yyyy", { locale: es })} - {format(fin, "dd/MM/yyyy", { locale: es })}
                                  </p>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{evento.titulo}</DialogTitle>
                                <p>{evento.descripcion}</p>
                                <p className="text-sm text-gray-600">Fecha: {format(inicio, "dd/MM/yyyy - HH:mm", { locale: es })}</p>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{evento.descripcion}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Tabla de Horarios de Inscripción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horarios de Inscripción y Reinscripción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Carrera</th>
                      <th className="px-4 py-2 text-left">Inicio I.E.</th>
                      <th className="px-4 py-2 text-left">Rein. I.E.</th>
                      <th className="px-4 py-2 text-left">Fin I.E.</th>
                      <th className="px-4 py-2 text-left">Inicio R.E.</th>
                      <th className="px-4 py-2 text-left">Rein. R.E.</th>
                      <th className="px-4 py-2 text-left">Fin R.E.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horarios.map((h, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{h.carrera}</td>
                        <td className="px-4 py-2">{h.inicioIE}</td>
                        <td className="px-4 py-2">{h.reinIE}</td>
                        <td className="px-4 py-2">{h.finIE}</td>
                        <td className="px-4 py-2">{h.inicioRE}</td>
                        <td className="px-4 py-2">{h.reinRE}</td>
                        <td className="px-4 py-2">{h.finRE}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Modal para Evento Seleccionado */}
      {eventoSeleccionado && (
        <Dialog open={true} onOpenChange={() => setEventoSeleccionado(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{eventoSeleccionado.titulo}</DialogTitle>
              <p>{eventoSeleccionado.descripcion}</p>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}