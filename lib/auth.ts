import { obtenerUsuarioPorCedula } from '@/autenticacion';
import { Usuario } from '@/lib/datos';

export function getUserFromLocalStorage() {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('usuarioActual');
        if (!stored) return null;
        const user = JSON.parse(stored);
        // Validar contra mocks para prevenir manipulación
        const validatedUser = obtenerUsuarioPorCedula(user.cedula);
        return validatedUser && validatedUser.tipo === user.tipo ? validatedUser : null;
    }
    return null;
}

export async function getCurrentUser(id: string): Promise<Usuario | null> {
  // Temporal: Busca en mocks
  return usuarios.find(u => u.id === id) || null;
  // Futuro: Prisma
}