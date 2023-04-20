import { useState } from "react"

import Section from "@/components/Section"
import Logo from "@/components/icons/Logo"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"

const VALID_DOMAINS = ["syndicate.io", "nike.com"]

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("")
  const stytch = useStytchB2BClient()

  const handleLogin = () => {
    const [_, domain] = emailAddress.split("@")
    if (!VALID_DOMAINS.includes(domain)) {
      return alert("Please use a valid email address")
    }

    // TODO: Add connection_id
    stytch.sso.start({
      connection_id: "",
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
        <label className="block text-white text-base font-medium mb-4">
          Enter your email address
        </label>

        <input
          className="block w-full text-white border bg-gray-8 border-gray-7 rounded-lg px-4 py-4 mb-6"
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
