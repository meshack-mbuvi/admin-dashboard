"use client"
import Header from "@/components/Navigation/Header"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <div className="flex flex-col space-y-28">
      <Header />
      <div className="flex flex-col w-full pr-7">{children}</div>
    </div>
  )
}
