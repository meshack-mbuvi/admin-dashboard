import { ReactNode } from "react"
import localFont from "next/font/local"

import Providers from "@/components/Providers"

import "styles/globals.css"

interface RootLayoutProps {
  children: ReactNode
}

const slussenFont = localFont({
  src: "./Slussen-Variable.woff2",
  variable: "--font-slussen",
})

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${slussenFont.variable} font-sans bg-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata = {
  title: "Admin dashboard",
  description: "Syndicate Dashboard",
  viewport: "width=device-width, initial-scale=1",
}
