"use client"

import { useEffect } from "react"
import { useStytchMemberSession } from "@stytch/nextjs/b2b"
import { useRouter } from "next/navigation"

export default function useAuth() {
  const router = useRouter()
  const { isInitialized, session } = useStytchMemberSession()

  useEffect(() => {
    if (isInitialized && !session) {
      router.push("/login")
    }
  }, [isInitialized, session, router])

  return { session, isSessionLoading: !isInitialized }
}
