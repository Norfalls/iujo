// Sistema de autenticación simple sin base de datos
export interface DatosUsuario {
  cedula: string
  nombre: string
  email: string
  tipo: "estudiante" | "profesor" | "administrador"
  contrasena: string
}

// Usuarios registrados simulados (en producción esto estaría en base de datos)
const usuariosRegistrados: DatosUsuario[] = [
  {
    cedula: "26644945",
    nombre: "Norkis Falcon",
    email: "norkis.falcon@iujo.edu.ve",
    tipo: "estudiante",
    contrasena: "estudiante123",
  },
  {
    cedula: "25513007",
    nombre: "Jorge Araujo",
    email: "jorge.araujo@iujo.edu.ve",
    tipo: "estudiante",
    contrasena: "estudiante123",
  },
  {
    cedula: "12345678",
    nombre: "María González",
    email: "maria.gonzalez@iujo.edu.ve",
    tipo: "estudiante",
    contrasena: "estudiante123",
  },
  {
    cedula: "34567890",
    nombre: "Dr. Juan Pérez",
    email: "juan.perez@iujo.edu.ve",
    tipo: "profesor",
    contrasena: "profesor123",
  },
  {
    cedula: "56789012",
    nombre: "Luis Administrador",
    email: "luis.admin@iujo.edu.ve",
    tipo: "administrador",
    contrasena: "admin123",
  },
]

export function verificarCredenciales(cedula: string, contrasena: string): DatosUsuario | null {
  const usuario = usuariosRegistrados.find((u) => u.cedula === cedula && u.contrasena === contrasena)
  return usuario || null
}

export function registrarUsuario(datos: DatosUsuario): boolean {
  // Verificar si ya existe un usuario con esa cédula
  const existe = usuariosRegistrados.some((u) => u.cedula === datos.cedula)
  if (existe) {
    return false
  }

  usuariosRegistrados.push(datos)
  return true
}

export function obtenerUsuarioPorCedula(cedula: string): DatosUsuario | null {
  return usuariosRegistrados.find((u) => u.cedula === cedula) || null
}
