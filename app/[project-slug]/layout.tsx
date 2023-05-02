"use client"
import { ReactNode } from "react"
import Header from "@/components/Navigation/Header"
import Sidebar from "@/components/Navigation/Sidebar"
import AddContractProvider from '@/context/addContract'

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <AddContractProvider>
      <div className="flex flex-col relative">
        <Header />
        <div className="flex h-screen pt-24">
          <Sidebar />
          <div className="flex flex-col w-full pr-7">{children}</div>
        </div>
      </div>
    </AddContractProvider>
  )
}
