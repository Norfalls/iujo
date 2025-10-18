"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { DatosUsuario } from "@/lib/autenticacion"

interface PropiedadesProtegerRuta {
  children: React.ReactNode
  tipoPermitido: "estudiante" | "profesor" | "administrador"
}

export function ProtegerRuta({ children, tipoPermitido }: PropiedadesProtegerRuta) {
  const router = useRouter()
  const [autorizado, setAutorizado] = useState(false)
  const [usuario, setUsuario] = useState<DatosUsuario | null>(null)

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActual")

    if (!usuarioGuardado) {
      router.push("/login")
      return
    }

    const datosUsuario: DatosUsuario = JSON.parse(usuarioGuardado)

    if (datosUsuario.tipo !== tipoPermitido) {
      router.push("/login")
      return
    }

    setUsuario(datosUsuario)
    setAutorizado(true)
  }, [router, tipoPermitido])

  if (!autorizado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export function usarUsuarioActual() {
  const [usuario, setUsuario] = useState<DatosUsuario | null>(null)

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActual")
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
    }
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActual")
    window.location.href = "/login"
  }

  return { usuario, cerrarSesion }
}
