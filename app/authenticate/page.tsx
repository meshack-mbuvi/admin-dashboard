"use client"

import { useStytchB2BClient, useStytchMemberSession } from "@stytch/nextjs/b2b"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import Button from "@/components/Buttons"
import Logo from "@/components/icons/Logo"

type ErrorType = "expiredLink" | "generic"

// DEV: This page is configured as the login callback url from Stytch
export default function Authenticate() {
  const stytch = useStytchB2BClient()
  const { session } = useStytchMemberSession()
  const router = useRouter()
  const [error, setError] = useState<ErrorType | null>("expiredLink")

  const handleBackToLogin = () => {
    router.push("/")
  }

  useEffect(() => {
    const authenticate = async () => {
      // If a session is found redirect to the projects page
      if (session) {
        router.push("/projects")
        return
      }

      // Get the token from the callback URL
      const token = new URLSearchParams(window.location.search).get("token")
      // If no token is found redirect to the sign in page
      if (!token) {
        router.push("/")
        return
      }

      try {
        // Authenticate the user with the token
        await stytch.magicLinks.authenticate({
          magic_links_token: token,
          // DEV: 7 days in minutes
          session_duration_minutes: 10080,
        })

        router.push("/projects")
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("unable_to_auth_magic_link")
        ) {
          return setError("expiredLink")
        }

        return setError("generic")
      }
    }

    authenticate()
  }, [stytch, session, router])

  if (error === "expiredLink") {
    return (
      <div className="text-center w-full mt-24">
        <Logo className="w-16 mx-auto mb-8" />
        <p className="text-gray-2 text-2xl mb-6">
          This link is expired or has already been used, try logging in again
        </p>

        <Button onClick={handleBackToLogin}>Back to Login</Button>
      </div>
    )
  }

  if (error === "generic") {
    return (
      <div className="text-center w-full mt-24">
        <Logo className="w-16 mx-auto mb-8" />
        <p className="text-gray-2 text-2xl mb-6">
          Something went wrong, try logging in again
        </p>

        <Button onClick={handleBackToLogin}>Back to Login</Button>
      </div>
    )
  }

  return (
    <div className="font-medium text-2xl text-center w-full mt-24">
      Loading...
    </div>
  )
}
