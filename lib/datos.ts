export type TipoUsuario = "estudiante" | "profesor" | "administrador"

export interface Usuario {
  id: string
  nombre: string
  email: string
  tipo: TipoUsuario
  cedula: string
}

export interface Carrera {
  id: string
  nombre: string
  codigo: string
}

export interface Materia {
  id: string
  nombre: string
  codigo: string
  carreraId: string
  creditos: number
  profesorId: string
}

export interface Seccion {
  id: string
  materiaId: string
  codigo: string
  horario: string
  cupoMaximo: number
  estudiantesInscritos: string[]
}

export interface Inscripcion {
  id: string
  estudianteId: string
  seccionId: string
  periodoId: string
}

export interface Calificacion {
  id: string
  estudianteId: string
  materiaId: string
  lapso: number
  nota: number
  periodoId: string
}

export interface Asistencia {
  id: string
  estudianteId: string
  seccionId: string
  fecha: string
  presente: boolean
}

export interface Periodo {
  id: string
  nombre: string
  fechaInicio: string
  fechaFin: string
  activo: boolean
}

export interface Silabo {
  id: string
  materiaId: string
  profesorId: string
  contenido: string
  objetivos: string[]
}

// Datos simulados
export const usuarios: Usuario[] = [
  {
    id: "est1",
    nombre: "María González",
    email: "maria.gonzalez@estudiante.edu",
    tipo: "estudiante",
    cedula: "12345678",
  },
  {
    id: "est2",
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@estudiante.edu",
    tipo: "estudiante",
    cedula: "23456789",
  },
  {
    id: "prof1",
    nombre: "Dr. Juan Pérez",
    email: "juan.perez@profesor.edu",
    tipo: "profesor",
    cedula: "34567890",
  },
  {
    id: "prof2",
    nombre: "Dra. Ana Martínez",
    email: "ana.martinez@profesor.edu",
    tipo: "profesor",
    cedula: "45678901",
  },
  {
    id: "admin1",
    nombre: "Luis Administrador",
    email: "luis.admin@universidad.edu",
    tipo: "administrador",
    cedula: "56789012",
  },
]

export const carreras: Carrera[] = [
  { id: "car1", nombre: "Ingeniería en Sistemas", codigo: "ISI" },
  { id: "car2", nombre: "Administración de Empresas", codigo: "ADE" },
  { id: "car3", nombre: "Contaduría Pública", codigo: "CPB" },
]

export const materias: Materia[] = [
  {
    id: "mat1",
    nombre: "Programación I",
    codigo: "ISI-101",
    carreraId: "car1",
    creditos: 4,
    profesorId: "prof1",
  },
  {
    id: "mat2",
    nombre: "Base de Datos",
    codigo: "ISI-201",
    carreraId: "car1",
    creditos: 3,
    profesorId: "prof1",
  },
  {
    id: "mat3",
    nombre: "Matemáticas Financieras",
    codigo: "ADE-102",
    carreraId: "car2",
    creditos: 3,
    profesorId: "prof2",
  },
  {
    id: "mat4",
    nombre: "Contabilidad General",
    codigo: "CPB-101",
    carreraId: "car3",
    creditos: 4,
    profesorId: "prof2",
  },
]

export const secciones: Seccion[] = [
  {
    id: "sec1",
    materiaId: "mat1",
    codigo: "A",
    horario: "Lunes y Miércoles 8:00-10:00",
    cupoMaximo: 30,
    estudiantesInscritos: ["est1", "est2"],
  },
  {
    id: "sec2",
    materiaId: "mat2",
    codigo: "B",
    horario: "Martes y Jueves 10:00-12:00",
    cupoMaximo: 25,
    estudiantesInscritos: ["est1"],
  },
  {
    id: "sec3",
    materiaId: "mat3",
    codigo: "A",
    horario: "Viernes 14:00-17:00",
    cupoMaximo: 35,
    estudiantesInscritos: ["est2"],
  },
]

export const periodos: Periodo[] = [
  {
    id: "per1",
    nombre: "2024-1",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-06-30",
    activo: true,
  },
  {
    id: "per2",
    nombre: "2023-2",
    fechaInicio: "2023-08-01",
    fechaFin: "2023-12-15",
    activo: false,
  },
]

export const inscripciones: Inscripcion[] = [
  { id: "ins1", estudianteId: "est1", seccionId: "sec1", periodoId: "per1" },
  { id: "ins2", estudianteId: "est1", seccionId: "sec2", periodoId: "per1" },
  { id: "ins3", estudianteId: "est2", seccionId: "sec1", periodoId: "per1" },
  { id: "ins4", estudianteId: "est2", seccionId: "sec3", periodoId: "per1" },
]

export const calificaciones: Calificacion[] = [
  { id: "cal1", estudianteId: "est1", materiaId: "mat1", lapso: 1, nota: 18, periodoId: "per1" },
  { id: "cal2", estudianteId: "est1", materiaId: "mat1", lapso: 2, nota: 16, periodoId: "per1" },
  { id: "cal3", estudianteId: "est1", materiaId: "mat2", lapso: 1, nota: 19, periodoId: "per1" },
  { id: "cal4", estudianteId: "est2", materiaId: "mat1", lapso: 1, nota: 15, periodoId: "per1" },
  { id: "cal5", estudianteId: "est2", materiaId: "mat3", lapso: 1, nota: 17, periodoId: "per1" },
]

export const asistencias: Asistencia[] = [
  { id: "asi1", estudianteId: "est1", seccionId: "sec1", fecha: "2024-01-15", presente: true },
  { id: "asi2", estudianteId: "est1", seccionId: "sec1", fecha: "2024-01-17", presente: true },
  { id: "asi3", estudianteId: "est2", seccionId: "sec1", fecha: "2024-01-15", presente: false },
  { id: "asi4", estudianteId: "est2", seccionId: "sec1", fecha: "2024-01-17", presente: true },
]

export const silabos: Silabo[] = [
  {
    id: "sil1",
    materiaId: "mat1",
    profesorId: "prof1",
    contenido: "Introducción a la programación estructurada y orientada a objetos",
    objetivos: [
      "Comprender los fundamentos de la programación",
      "Desarrollar algoritmos eficientes",
      "Aplicar buenas prácticas de código",
    ],
  },
  {
    id: "sil2",
    materiaId: "mat2",
    profesorId: "prof1",
    contenido: "Diseño y gestión de bases de datos relacionales",
    objetivos: [
      "Diseñar modelos de datos normalizados",
      "Implementar consultas SQL complejas",
      "Administrar sistemas de bases de datos",
    ],
  },
]
