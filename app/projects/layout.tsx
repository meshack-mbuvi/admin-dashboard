import { ReactNode } from "react"
import { redirect } from "next/navigation"

import Header from "@/components/Navigation/Header"

import getAuthToken from "@/utils/getAuthToken"

interface LayoutProps {
  children: ReactNode
}

export default function DashboardLayout(props: LayoutProps) {
  const { children } = props
  const authToken = getAuthToken()

  // DEV: In any server layout that requires auth we can have this check that wont require any loading state
  if (!authToken) {
    redirect("/")
  }

  return (
    <div>
      <Header />
      <div className="ml-28 mr-10">{children}</div>
    </div>
  )
}
