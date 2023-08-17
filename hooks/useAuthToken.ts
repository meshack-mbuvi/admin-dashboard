import { useEffect, useState } from "react"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"

export default function useAuthToken() {
  const stytch = useStytchB2BClient()
  const [token, setToken] = useState<string | null | undefined>(null)

  useEffect(() => {
    const tokens = stytch.session.getTokens()

    setToken(tokens?.session_token)
  }, [stytch.session])

  return token
}
