import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { User, GraduationCap, CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react"

interface CarreraInfoCardProps {
  estudiante: {
    carrera: string
    horario: string
    creditosInscritos: number
    creditosAprobados: number
    indiceAcademico: number
    indiceEficiencia: number
    servicioComunitario: {
      porcentaje: number
      iniciado: string
      culminado: boolean
    }
  }
}

const requisitos = [
  { label: "Cédula", cumplido: true },
  { label: "Título", cumplido: true },
  { label: "Calificaciones", cumplido: true },
  { label: "Buena conducta", cumplido: true },
  { label: "OPST", cumplido: false },
  { label: "Inscripción militar", cumplido: false },
  { label: "Partida nacimiento", cumplido: true },
  { label: "2 fotografías", cumplido: true },
]

export default function CarreraInfoCard({ estudiante }: CarreraInfoCardProps) {
  return (
    <div className="space-y-6">
      {/* Carrera y Horario */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-green-700" />
            <CardTitle className="text-lg text-green-900">Carrera</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-green-800">Informática</p>
              <p className="text-xs text-green-600">Horario: {estudiante.horario}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datos de la Carrera */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <CardTitle className="text-lg">Datos de la carrera</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Sem. no terminados</p>
              <p className="font-semibold">0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Créditos inscritos</p>
              <p className="font-semibold">{estudiante.creditosInscritos}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Créditos aprobados</p>
              <p className="font-semibold text-green-600">{estudiante.creditosAprobados}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">Ind. Académico</p>
              <Badge variant="secondary" className="text-xs">
                {estudiante.indiceAcademico.toFixed(3)}
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <label className="text-sm font-medium">¿Tramitar título?</label>
            </div>
            <button className="px-4 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
              Inscripción
            </button>
          </div>
          <a href="#" className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1">
            IA por períodos
          </a>
        </CardContent>
      </Card>

      {/* Requisitos */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-lg">Requisitos</CardTitle>
            </div>
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="text-green-700 border-green-700">Orig.</Badge>
              <Badge variant="outline" className="text-amber-700 border-amber-700">Copia</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {requisitos.map((req) => (
              <div key={req.label} className="flex items-center justify-between text-sm">
                <span className={req.cumplido ? "text-foreground" : "text-muted-foreground"}>
                  {req.label}
                </span>
                <div className="flex gap-3">
                  <Checkbox checked={req.cumplido} disabled className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600" />
                  <Checkbox checked={req.cumplido} disabled className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Servicio Comunitario */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-orange-700" />
            <CardTitle className="text-lg text-orange-900">Servicio Comunitario</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-800">% Créditos aprobados:</span>
            <Badge className="bg-orange-600 text-white">
              {estudiante.servicioComunitario.porcentaje}%
            </Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1 text-orange-700">
              <Clock className="w-3.5 h-3.5" />
              Iniciado el:
            </span>
            <span className="font-medium">{estudiante.servicioComunitario.iniciado}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-orange-700">¿Culminado?</span>
            {estudiante.servicioComunitario.culminado ? (
              <Badge variant="default" className="bg-green-600">Sí</Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-400">No</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}