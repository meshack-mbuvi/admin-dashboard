import "server-only"
import { cookies } from "next/headers"

export default function getAuthToken() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("stytch_session")
  return authCookie?.value
}
