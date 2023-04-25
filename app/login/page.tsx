"use client"

import { useState } from "react"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"

import Section from "@/components/Section"
import Logo from "@/components/icons/Logo"
import Label from "@/components/Label"
import Input from "@/components/Input"

const VALID_DOMAINS = ["syndicate.io", "nike.com"]

const DOMAIN_CONNECTIONS = {
  "syndicate.io": "oidc-connection-test-56716532-5fa9-41f7-9842-69b6e90d689d",
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

    stytch.sso.start({
      connection_id:
        DOMAIN_CONNECTIONS[domain as keyof typeof DOMAIN_CONNECTIONS],
      login_redirect_url: "http://localhost:3000/authenticate",
    })
  }

  return (
    <div className="w-[500px] mx-auto flex flex-col items-center mt-32">
      <Logo className="text-white w-12 mb-10" />

      <h2 className="text-white font-medium text-2xl mb-14">
        Welcome to Syndicate
      </h2>

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
