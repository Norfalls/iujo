'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Upload, Camera } from 'lucide-react';

export default function Registro() {
  const router = useRouter();
  const [form, setForm] = useState({
    cedula: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    email: '',
    contrasena: '',
    confirmar: '',
  });
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setExito('');
    setCargando(true);

    if (form.contrasena !== form.confirmar) {
      setError('Las contraseñas no coinciden');
      setCargando(false);
      return;
    }

    if (!imagen) {
      setError('Suba una foto de su cédula');
      setCargando(false);
      return;
    }

    const data = new FormData();
    data.append('cedula', form.cedula);
    data.append('nombre1', form.nombre1);
    data.append('nombre2', form.nombre2);
    data.append('apellido1', form.apellido1);
    data.append('apellido2', form.apellido2);
    data.append('email', form.email);
    data.append('contrasena', form.contrasena);
    data.append('imagen', imagen);

    try {
      const res = await fetch('/api/auth/registro', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setExito(result.message);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sistema Académico</h1>
          <p className="text-muted-foreground">Instituto Universitario Jesús Obrero</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Complete el formulario y suba una foto de su cédula</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Foto de cédula */}
              <div className="space-y-2">
                <Label>Foto de Cédula</Label>
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-48 h-32 object-cover rounded-lg border" />
                    ) : (
                      <div className="w-48 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100">
                        <Camera className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Subir foto</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImage} required />
                  </label>
                </div>
              </div>

              {/* Cédula */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cédula de Identidad</Label>
                  <Input
                    placeholder="Ej: 12345678"
                    value={form.cedula}
                    onChange={(e) => setForm({ ...form, cedula: e.target.value.replace(/\D/g, '') })}
                    maxLength={8}
                    required
                  />
                </div>
              </div>

              {/* Nombres */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>1er Nombre</Label>
                  <Input
                    placeholder="Juan"
                    value={form.nombre1}
                    onChange={(e) => setForm({ ...form, nombre1: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>2do Nombre (opcional)</Label>
                  <Input
                    placeholder="Carlos"
                    value={form.nombre2}
                    onChange={(e) => setForm({ ...form, nombre2: e.target.value })}
                  />
                </div>
              </div>

              {/* Apellidos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>1er Apellido</Label>
                  <Input
                    placeholder="Pérez"
                    value={form.apellido1}
                    onChange={(e) => setForm({ ...form, apellido1: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>2do Apellido (opcional)</Label>
                  <Input
                    placeholder="Gómez"
                    value={form.apellido2}
                    onChange={(e) => setForm({ ...form, apellido2: e.target.value })}
                  />
                </div>
              </div>

              {/* Email y contraseña */}
              <div className="space-y-2">
                <Label>Correo Electrónico</Label>
                <Input
                  type="email"
                  placeholder="ejemplo@iujo.edu.ve"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <Input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={form.contrasena}
                    onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirmar Contraseña</Label>
                  <Input
                    type="password"
                    placeholder="Repita su contraseña"
                    value={form.confirmar}
                    onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}
              {exito && <p className="text-green-600 text-sm">{exito}</p>}

              <Button type="submit" className="w-full" disabled={cargando}>
                {cargando ? 'Subiendo...' : 'Crear Cuenta'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tiene una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
