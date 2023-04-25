// This is where the main layout goes
"use client"

import Header from "@/components/Navigation/Header"
import Sidebar from "@/components/Navigation/Sidebar"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex h-screen pt-24">
        <Sidebar />
        <div className="flex flex-col w-full h-screens">{children}</div>
      </div>
    </div>
  )
}
