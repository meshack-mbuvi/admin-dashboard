"use client"

import { useStytchB2BClient, useStytchMemberSession } from "@stytch/nextjs/b2b"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// DEV: This page is configured as the login callback url from Stytch
export default function Authenticate() {
  const stytch = useStytchB2BClient()
  const { session } = useStytchMemberSession()
  const router = useRouter()

  useEffect(() => {
    const authenticate = async () => {
      // If a session is found redirect to the projects page
      if (session) {
        router.push("/")
        return
      }

      // Get the token from the callback URL
      const token = new URLSearchParams(window.location.search).get("token")
      // If no token is found redirect to the sign in page
      if (!token) {
        router.push("/login")
        return
      }
      // Authenticate the user with the token
      await stytch.magicLinks.authenticate({
        magic_links_token: token,
        session_duration_minutes: 60,
      })

      router.push("/")
    }

    authenticate()
  }, [stytch, session, router])

  return (
    <div className="  font-medium text-2xl text-center w-full mt-24">
      Loading...
    </div>
  )
}
