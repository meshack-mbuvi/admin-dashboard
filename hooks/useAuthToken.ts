import { useStytchB2BClient } from "@stytch/nextjs/b2b"

export default function useAuthToken() {
  const stytch = useStytchB2BClient()

  const tokens = stytch.session.getTokens()

  return tokens?.session_token
}
