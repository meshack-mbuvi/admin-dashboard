import { redirect } from "next/navigation"

import Logo from "@/components/icons/Logo"
import LoginForm from "@/components/LoginForm"

import getAuthToken from "@/utils/getAuthToken"
import Link from "next/link"
import clsx from "clsx"
import { DarkButtonStyles, LightButtonStyles } from "@/components/Buttons"

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
      <p className="mt-10 border-t border-gray-7 pt-10 w-[500px] text-center text-gray-4">
        or{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
