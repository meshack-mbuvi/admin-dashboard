"use client"

import { useStytchB2BClient } from "@stytch/nextjs/b2b"
import { useState } from "react"

import Section from "./Section"

import { getAuthRedirectURL } from "@/utils/environment"
import Form from "./Form"
import Submit from "./Form/Submit"
import TextInput from "./Form/TextInput"

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
    <h2 className="font-medium text-2xl mb-14">
      Check your email for Dashboard Access
    </h2>
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
    </>
  )
}
