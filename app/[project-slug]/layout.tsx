"use client"
import Header from "@/components/Navigation/Header"
import Sidebar from "@/components/Navigation/Sidebar"
import { ReactNode } from "react"
import AuthLoading from "@/components/AuthLoading"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <div className="flex flex-col relative">
      <Header />
      <div className="flex h-screen pt-24">
        <Sidebar />
        <div className="flex flex-col w-full h-screens">
          <AuthLoading>{children}</AuthLoading>
        </div>
      </div>
    </div>
  )
}
