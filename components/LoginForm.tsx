"use client"

import { useStytchB2BClient } from "@stytch/nextjs/b2b"
import { useState } from "react"
import Link from "next/link"

import Section from "./Section"
import Form from "./Form"
import Submit from "./Form/Submit"
import TextInput from "./Form/TextInput"

import { getAuthRedirectURL } from "@/utils/environment"

export default function LoginForm() {
  const [loginContinued, setLoginContinued] = useState<boolean>(false)
  const stytch = useStytchB2BClient()

  const handleLogin = (values: { emailAddress: string }) => {
    return stytch.magicLinks.email.discovery
      .send({
        email_address: values.emailAddress,
        discovery_redirect_url: getAuthRedirectURL(),
      })
      .then(() => {
        setLoginContinued(true)
      })
      .catch((e) => {
        // do something with the error
        console.error(e?.message)
        return e
      })
  }

  return loginContinued ? (
    <div>
      <h2 className="font-medium text-2xl mb-14 text-center">
        Check your email for dashboard access, you can now close this window.
      </h2>

      <p className="w-[500px] text-center text-gray-4">
        <button onClick={() => setLoginContinued(false)} className="underline">
          Return home
        </button>
      </p>
    </div>
  ) : (
    <>
      <h2 className="font-medium text-2xl mb-14">Welcome to Syndicate</h2>
      <Section className="p-6 w-full">
        <Form onSubmit={handleLogin}>
          <TextInput
            validate={{ required: "Required" }}
            name="emailAddress"
            label="Enter your email address"
            placeholder="Email Address"
            type="email"
          />
          <Submit>Continue</Submit>
        </Form>
      </Section>

      <p className="mt-10 border-t border-gray-7 pt-10 w-[500px] text-center text-gray-4">
        or{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </>
  )
}
