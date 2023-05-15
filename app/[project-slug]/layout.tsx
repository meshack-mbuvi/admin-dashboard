import { ReactNode } from "react"

import Header from "@/components/Navigation/Header"
import Sidebar from "@/components/Navigation/Sidebar"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex h-screen pt-24">
        <div className="flex flex-col w-full h-screens">{children}</div>
      </div>
    </div>
  )
}
