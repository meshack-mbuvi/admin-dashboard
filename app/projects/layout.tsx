"use client"

import { ReactNode } from "react"

import AuthLoading from "@/components/AuthLoading"
import Header from "@/components/Navigation/Header"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <div className="flex flex-col space-y-28">
      <Header />
      <div className="flex flex-col w-full pr-7">
        <AuthLoading>{children}</AuthLoading>
      </div>
    </div>
  )
}
