import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sistema de Gestión Académica - IUJO",
  description: "Sistema de gestión académica del Instituto Universitario Jesús Obrero",
  icons: [
    { rel: 'icon', url: 'public/favicon.ico' }, // Favicon principal
    { rel: 'apple-touch-icon', url: 'public/apple-icon.png' }, // Para iOS
    { rel: 'icon', url: 'public/favicon-16x16.png', sizes: '16x16' }, // Icono pequeño
    { rel: 'icon', url: 'public/favicon-32x32.png', sizes: '32x32' }, // Icono grande
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  )
}
