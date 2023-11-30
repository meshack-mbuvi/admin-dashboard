import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { Analytics } from "@vercel/analytics/react"

import Header from "@/components/Navigation/Header"
import Footer from "@/components/Footer"
import Modals from "@/components/Modal/Modals"

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
      <div className="mx-6 lg:mx-10">{children}</div>
      <Footer />
      <Modals />
      <Analytics />
    </div>
  )
}
