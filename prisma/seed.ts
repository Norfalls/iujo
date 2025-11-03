import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpia tablas existentes (opcional, para tests; comenta si no quieres borrar datos)
  await prisma.silabo.deleteMany();
  await prisma.asistencia.deleteMany();
  await prisma.calificacion.deleteMany();
  await prisma.inscripcion.deleteMany();
  await prisma.periodo.deleteMany();
  await prisma.seccion.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.carrera.deleteMany();
  await prisma.user.deleteMany(); // Asumiendo modelo User; ajusta si separados

  // Insertar Usuarios (asumiendo modelo User con campo 'tipo')
  await prisma.user.createMany({
    data: [
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
    ],
  });

  // Insertar Carreras
  await prisma.carrera.createMany({
    data: [
      { id: "car1", nombre: "Ingeniería en Sistemas", codigo: "ISI" },
      { id: "car2", nombre: "Administración de Empresas", codigo: "ADE" },
      { id: "car3", nombre: "Contaduría Pública", codigo: "CPB" },
    ],
  });

  // Insertar Materias
  await prisma.materia.createMany({
    data: [
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
    ],
  });

  // Insertar Secciones
  await prisma.seccion.createMany({
    data: [
      {
        id: "sec1",
        materiaId: "mat1",
        codigo: "A",
        horario: "Lunes y Miércoles 8:00-10:00",
        cupoMaximo: 30,
        estudiantesInscritos: ["est1", "est2"], // Asumiendo array de strings; ajusta si usas relaciones
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
    ],
  });

  // Insertar Periodos
  await prisma.periodo.createMany({
    data: [
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
    ],
  });

  // Insertar Inscripciones
  await prisma.inscripcion.createMany({
    data: [
      { id: "ins1", estudianteId: "est1", seccionId: "sec1", periodoId: "per1" },
      { id: "ins2", estudianteId: "est1", seccionId: "sec2", periodoId: "per1" },
      { id: "ins3", estudianteId: "est2", seccionId: "sec1", periodoId: "per1" },
      { id: "ins4", estudianteId: "est2", seccionId: "sec3", periodoId: "per1" },
    ],
  });

  // Insertar Calificaciones
  await prisma.calificacion.createMany({
    data: [
      { id: "cal1", estudianteId: "est1", materiaId: "mat1", lapso: 1, nota: 18, periodoId: "per1" },
      { id: "cal2", estudianteId: "est1", materiaId: "mat1", lapso: 2, nota: 16, periodoId: "per1" },
      { id: "cal3", estudianteId: "est1", materiaId: "mat2", lapso: 1, nota: 19, periodoId: "per1" },
      { id: "cal4", estudianteId: "est2", materiaId: "mat1", lapso: 1, nota: 15, periodoId: "per1" },
      { id: "cal5", estudianteId: "est2", materiaId: "mat3", lapso: 1, nota: 17, periodoId: "per1" },
    ],
  });

  // Insertar Asistencias
  await prisma.asistencia.createMany({
    data: [
      { id: "asi1", estudianteId: "est1", seccionId: "sec1", fecha: "2024-01-15", presente: true },
      { id: "asi2", estudianteId: "est1", seccionId: "sec1", fecha: "2024-01-17", presente: true },
      { id: "asi3", estudianteId: "est2", seccionId: "sec1", fecha: "2024-01-15", presente: false },
      { id: "asi4", estudianteId: "est2", seccionId: "sec1", fecha: "2024-01-17", presente: true },
    ],
  });

  // Insertar Silabos
  await prisma.silabo.createMany({
    data: [
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
    ],
  });

  console.log('Datos de mocks insertados exitosamente en PostgreSQL!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });