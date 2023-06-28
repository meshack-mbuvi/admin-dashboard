import { redirect } from "next/navigation"

import Logo from "@/components/icons/Logo"
import LoginForm from "@/components/LoginForm"

import getAuthToken from "@/utils/getAuthToken"

export default function Login() {
  const authToken = getAuthToken()

  // DEV: If a user is already logged in take them to the dashboard page
  if (authToken) {
    redirect("/dashboard")
  }

  return (
    <div className="w-[500px] mx-auto flex flex-col items-center mt-32">
      <Logo className="w-12 mb-10" />
      <LoginForm />
    </div>
  )
}
