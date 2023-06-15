"use client"
import AuthLoading from "@/components/AuthLoading"
import Header from "@/components/Navigation/Header"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <div className="flex flex-col relative">
      <Header />
      <div className="flex h-full">
        <div className="flex flex-col w-full pr-7">
          <AuthLoading>{children}</AuthLoading>
        </div>
      </div>
    </div>
  )
}
