import { useStytchB2BClient } from "@stytch/nextjs/b2b"
import { useEffect, useState } from "react"

export default function useAuthToken() {
  const stytch = useStytchB2BClient()
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    const tokens = stytch.session.getTokens()

    setToken(tokens?.session_token)
  }, [stytch.session])

  return token
}
