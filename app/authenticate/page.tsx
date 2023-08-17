"use client"

import { useStytchB2BClient, useStytchMemberSession } from "@stytch/nextjs/b2b"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { DiscoveredOrganization } from "@stytch/vanilla-js"

import Button from "@/components/Buttons"
import Logo from "@/components/icons/Logo"

type ErrorType = "expiredLink" | "generic"

// DEV: This page is configured as the login callback url from Stytch
export default function Authenticate() {
  const stytch = useStytchB2BClient()
  const { session } = useStytchMemberSession()
  const router = useRouter()
  const [error, setError] = useState<ErrorType | null>(null)
  const [discoveredOrganizations, setDiscoveredOrganizations] = useState<
    DiscoveredOrganization[]
  >([])
  const [intermediateSessionToken, setIntermediateSessionToken] =
    useState<string>("")

  const handleBackToLogin = () => {
    router.push("/")
  }

  const handleLogin = useCallback(
    async (organizationId: string, intermediateSessionToken: string) => {
      try {
        await stytch.discovery.intermediateSessions.exchange({
          intermediate_session_token: intermediateSessionToken,
          organization_id: organizationId,
          session_duration_minutes: 10080,
        })
        router.push("/dashboard")
      } catch (error) {
        return setError("generic")
      }
    },
    [stytch.discovery.intermediateSessions, router]
  )

  useEffect(() => {
    const authenticate = async () => {
      // If a session is found redirect to the dashboard page
      if (session) {
        router.push("/dashboard")
        return
      }

      // Get the token from the callback URL
      const token = new URLSearchParams(window.location.search).get("token")
      const tokenType = new URLSearchParams(window.location.search).get(
        "stytch_token_type"
      )
      // If no token is found redirect to the sign in page
      if (!token || !tokenType) {
        router.push("/")
        return
      }

      try {
        // authenticates invites
        if (tokenType === "multi_tenant_magic_links") {
          await stytch.magicLinks.authenticate({
            magic_links_token: token,
            // DEV: 7 days in minutes
            session_duration_minutes: 10080,
          })

          router.push("/dashboard")
          return
        }

        // authenticates discovery
        const { intermediate_session_token, discovered_organizations } =
          await stytch.magicLinks.discovery.authenticate({
            discovery_magic_links_token: token,
          })

        setDiscoveredOrganizations(discovered_organizations)
        // intermediate_session_toke lasts 10 minutes
        setIntermediateSessionToken(intermediate_session_token)

        if (discovered_organizations.length === 1) {
          handleLogin(
            discovered_organizations[0].organization.organization_id,
            intermediate_session_token
          )
        }
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
  }, [stytch, session, router, handleLogin])

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
      {discoveredOrganizations.length > 1 ? (
        <div className="flex flex-col items-center text-center w-full mt-24">
          <Logo className="w-12 mb-8" />
          <div className="mb-8 text-xl">Select organization to view</div>
          {discoveredOrganizations.map((org, index) => {
            return (
              <button
                className="font-normal text-lg border border-gray-8 w-80 rounded-md px-4 py-2 hover:bg-gray-8 mb-4"
                key={index}
                onClick={() =>
                  handleLogin(
                    org.organization.organization_id,
                    intermediateSessionToken
                  )
                }
              >
                {org.organization.organization_name}
              </button>
            )
          })}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  )
}
