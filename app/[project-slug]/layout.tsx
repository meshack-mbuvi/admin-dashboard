"use client"
import Header from "@/components/Navigation/Header"
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
      <div className="flex h-screen pt-14 pl-24">
        <div className="flex flex-col w-full h-screens">
          <AuthLoading>{children}</AuthLoading>
        </div>
      </div>
    </div>
  )
}
