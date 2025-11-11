import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/lib/bcrypt';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { cedula, contrasena } = await req.json();

  const user = await prisma.user.findUnique({
    where: { cedula },
    include: { role: true },
  });

  if (!user || !user.passwordHash) {
    return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  if (!user.estado) {
    return Response.json({ error: 'Cuenta pendiente de aprobación' }, { status: 403 });
  }

  const valido = await comparePassword(contrasena, user.passwordHash);
  if (!valido) {
    return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  // Sesión simple con localStorage (solo ID y rol)
  const session = {
    id: user.id,
    cedula: user.cedula,
    nombre: `${user.nombre1} ${user.apellido1}`,
    rol: user.role.descripcion,
  };

  return Response.json({ session });
}