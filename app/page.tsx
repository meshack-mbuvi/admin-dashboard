"use client"

import { FormEvent, useEffect, useState } from "react"
import { useStytchB2BClient, useStytchMemberSession } from "@stytch/nextjs/b2b"
import { useRouter } from "next/navigation"

import { getAuthRedirectURL } from "@/utils/environment"

import Input from "@/components/Input"
import Label from "@/components/Label"
import Section from "@/components/Section"
import Logo from "@/components/icons/Logo"

const VALID_DOMAINS = ["syndicate.io", "nike.com"]

const DOMAIN_CONNECTIONS = {
  "syndicate.io": "organization-test-2f932663-014a-438c-8b2f-11722cdaae3a",
  "nike.com": "",
}

export default function Login() {
  const router = useRouter()
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [loginContinued, setLoginContinued] = useState<boolean>(false)
  const stytch = useStytchB2BClient()
  const { isInitialized, session } = useStytchMemberSession()

  // DEV: If a user is already logged in, redirect them to the projects page
  useEffect(() => {
    if (isInitialized && session) {
      router.push("/projects")
    }
  }, [isInitialized, session, router])

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [_, domain] = emailAddress.split("@")
    if (!VALID_DOMAINS.includes(domain)) {
      return alert("Please use a valid email address")
    }

    stytch.magicLinks.email.loginOrSignup({
      email_address: emailAddress,
      organization_id:
        DOMAIN_CONNECTIONS[domain as keyof typeof DOMAIN_CONNECTIONS],
      // Upon successful login and receiving email invite, redirect the user to the specified URL
      login_redirect_url: getAuthRedirectURL(),
    })
    setLoginContinued(true)
  }

  return (
    <div className="w-[500px] mx-auto flex flex-col items-center mt-32">
      <Logo className="w-12 mb-10" />
      {loginContinued ? (
        <h2 className="font-medium text-2xl mb-14">
          Check your email for Dashboard Access
        </h2>
      ) : (
        <>
          <h2 className="font-medium text-2xl mb-14">Welcome to Syndicate</h2>
          <Section className="p-6 w-full">
            <form onSubmit={handleLogin}>
              <Label className="block mb-4" htmlFor="email-address">
                Enter your email address
              </Label>

              <Input
                id="email-address"
                className="block w-full mb-6"
                placeholder="Email address"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={emailAddress}
              />

              <button
                type="submit"
                className="bg-white rounded-lg w-full py-4 text-black text-base font-semibold hover:opacity-90"
              >
                Continue
              </button>
            </form>
          </Section>
        </>
      )}
    </div>
  )
}
