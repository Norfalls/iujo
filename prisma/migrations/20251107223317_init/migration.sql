-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "permisos" TEXT[],
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "sexo" TEXT,
    "edoCivil" TEXT,
    "nombre1" TEXT NOT NULL,
    "nombre2" TEXT,
    "apellido1" TEXT NOT NULL,
    "apellido2" TEXT,
    "lugarNacimiento" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "discapacidad" TEXT,
    "etniaIndigena" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "photoUrl" TEXT,
    "roleId" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "userId" INTEGER NOT NULL,
    "anoGraduacion" TEXT,
    "plantelProcedencia" TEXT,
    "estudioFyA" BOOLEAN NOT NULL DEFAULT false,
    "codigoRUSNIEU" TEXT,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ProfessorProfile" (
    "userId" INTEGER NOT NULL,
    "departamento" TEXT,
    "fechaContratacion" TIMESTAMP(3),

    CONSTRAINT "ProfessorProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "userId" INTEGER NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'admin',
    "fechaIngreso" TIMESTAMP(3),

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "userId" INTEGER NOT NULL,
    "expediente" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,
    "photoUrl" TEXT,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "profesorId" INTEGER,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prerrequisito" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "prerrequisitoId" INTEGER NOT NULL,

    CONSTRAINT "Prerrequisito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seccion" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "cupoMaximo" INTEGER NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "seccionId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagoMatricula" (
    "id" SERIAL NOT NULL,
    "inscripcionId" INTEGER NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "montoPagado" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fechaPago" TIMESTAMP(3),
    "estado" TEXT NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "PagoMatricula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periodo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL,

    CONSTRAINT "Periodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "seccionId" INTEGER,
    "periodoId" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "seccionId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "presente" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calificacion" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "lapso" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,

    CONSTRAINT "Calificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Silabo" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "profesorId" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "objetivos" TEXT[],

    CONSTRAINT "Silabo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cedula_key" ON "User"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorProfile_userId_key" ON "ProfessorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_userId_key" ON "AdminProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_userId_key" ON "Contacto"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PagoMatricula_inscripcionId_key" ON "PagoMatricula"("inscripcionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorProfile" ADD CONSTRAINT "ProfessorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prerrequisito" ADD CONSTRAINT "Prerrequisito_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prerrequisito" ADD CONSTRAINT "Prerrequisito_prerrequisitoId_fkey" FOREIGN KEY ("prerrequisitoId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagoMatricula" ADD CONSTRAINT "PagoMatricula_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "Inscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Silabo" ADD CONSTRAINT "Silabo_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Silabo" ADD CONSTRAINT "Silabo_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
