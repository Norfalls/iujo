// Validación de cédula
export function validarCedula(cedula: string): boolean {
  // Remover guiones y espacios
  const limpia = cedula.replace(/[- ]/g, '').trim();
  
  // Formato: V/E + 7-8 dígitos, o solo 7-8 dígitos
  const regex = /^(V|E)?\d{7,8}$/;
  
  if (!regex.test(limpia)) return false;

  // Extraer prefijo y número
  const prefijo = limpia.charAt(0).toUpperCase();
  const numero = limpia.slice(prefijo === 'V' || prefijo === 'E' ? 1 : 0);
  
  if (numero.length < 7 || numero.length > 8) return false;

  return true;
}