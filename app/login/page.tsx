"use client"

import { useStytchB2BClient } from "@stytch/nextjs/b2b"
import { useState } from "react"

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
  const [emailAddress, setEmailAddress] = useState("")
  const stytch = useStytchB2BClient()

  const handleLogin = () => {
    const [_, domain] = emailAddress.split("@")
    if (!VALID_DOMAINS.includes(domain)) {
      return alert("Please use a valid email address")
    }

    stytch.magicLinks.email.loginOrSignup({
      email_address: emailAddress,
      organization_id:
        DOMAIN_CONNECTIONS[domain as keyof typeof DOMAIN_CONNECTIONS],
        // Upon successful login and receiving email invite, redirect the user to the specified URL
        login_redirect_url: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL,
    })
  }

  return (
    <div className="w-[500px] mx-auto flex flex-col items-center mt-32">
      <Logo className="  w-12 mb-10" />

      <h2 className="  font-medium text-2xl mb-14">Welcome to Syndicate</h2>

      <Section className="p-6 w-full">
        <Label className="block mb-4" htmlFor="">
          Enter your email address
        </Label>

        <Input
          className="block w-full mb-6"
          placeholder="Email address"
          onChange={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
        />

        <button
          className="bg-white rounded-lg w-full py-4 text-black text-base font-semibold"
          onClick={handleLogin}
        >
          Continue
        </button>
      </Section>
    </div>
  )
}
