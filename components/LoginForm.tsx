"use client"

import { FormEvent, useState } from "react"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"

import Section from "./Section"
import Label from "./Label"
import Input from "./Input"

import { getAuthRedirectURL } from "@/utils/environment"
import { DOMAIN_CONNECTIONS } from "@/utils/constants"

export default function LoginForm() {
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [loginContinued, setLoginContinued] = useState<boolean>(false)
  const stytch = useStytchB2BClient()

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [_, domain] = emailAddress.split("@")
    const domainConnection = DOMAIN_CONNECTIONS.find(
      (o) => o.orgName === domain.toLowerCase()
    )

    if (!domainConnection) {
      return alert("Please use a valid email address")
    }

    stytch.magicLinks.email.loginOrSignup({
      email_address: emailAddress,
      organization_id: domainConnection?.orgId,
      // Upon successful login and receiving email invite, redirect the user to the specified URL
      login_redirect_url: getAuthRedirectURL(),
    })
    setLoginContinued(true)
  }

  return loginContinued ? (
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
  )
}
