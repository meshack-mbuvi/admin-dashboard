"use client"

import { useStytchB2BClient } from "@stytch/nextjs/b2b"

export default function useAuthToken() {
  const stytch = useStytchB2BClient()

  const tokens = stytch.session.getTokens()
  const sessionToken = tokens?.session_token

  return sessionToken
}
