// app/api/auth/registro/route.ts
import { prisma } from '@/lib/prisma';
import { subirImagen } from '@/lib/upload';
import { validarCedula } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cedula = formData.get('cedula') as string;
    const nombre1 = formData.get('nombre1') as string;
    const nombre2 = formData.get('nombre2') as string | null;
    const apellido1 = formData.get('apellido1') as string;
    const apellido2 = formData.get('apellido2') as string | null;
    const email = formData.get('email') as string;
    const contrasena = formData.get('contrasena') as string;
    const imagen = formData.get('imagen') as File;

    // Validaciones
    if (!cedula || !nombre1 || !apellido1 || !contrasena || !imagen) {
      return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    if (!validarCedula(cedula)) {
      return Response.json({ error: 'Cédula inválida' }, { status: 400 });
    }

    if (contrasena.length < 6) {
      return Response.json({ error: 'Contraseña muy corta' }, { status: 400 });
    }

    // Verificar duplicados
    const existe = await prisma.user.findUnique({ where: { cedula } });
    if (existe) {
      return Response.json({ error: 'Cédula ya registrada' }, { status: 409 });
    }

    // Subir imagen
    const photoUrl = await subirImagen(imagen);

    // Hash contraseña
    const passwordHash = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    await prisma.user.create({
      data: {
        cedula,
        nombre1,
        nombre2: nombre2 || null,
        apellido1,
        apellido2: apellido2 || null,
        email: email || null,
        passwordHash,
        photoUrl,
        roleId: 4, // Pendiente|Solicitante por defecto
        estado: false,
      },
    });

    return Response.json({ message: 'Registro exitoso. Esperando aprobación.' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}