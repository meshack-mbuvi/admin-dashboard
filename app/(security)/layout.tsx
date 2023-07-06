import { redirect } from "next/navigation"

import getAuthToken from "@/utils/getAuthToken"

interface TwoFactorAuthLayoutProps {
  children: React.ReactNode
}

export default async function TwoFactorAuthLayout(
  props: TwoFactorAuthLayoutProps
) {
  const { children } = props
  const authToken = getAuthToken()

  // DEV: In any server layout that requires auth we can have this check that wont require any loading state
  if (!authToken) {
    redirect("/")
  }

  return (
    <div className="relative w-screen h-screen overflow-y-scroll bg-gray-8">
      {children}
    </div>
  )
}
