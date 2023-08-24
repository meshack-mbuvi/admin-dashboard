"use client"

import { useState } from "react"

import Form from "@/components/Form"
import Submit from "@/components/Form/Submit"
import TextInput from "@/components/Form/TextInput"
import Text from "@/components/Text"
import Logo from "@/components/icons/Logo"
import useCreateOrganization from "@/hooks/useCreateOrganization"
import { getAuthRedirectURL } from "@/utils/environment"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"

type OrganizationFields = {
  organizationName: string
  emailAddress: string
  userName: string
}

export default function CreateOrganization() {
  const { mutate } = useCreateOrganization()
  const [loginContinued, setLoginContinued] = useState<boolean>(false)
  const stytch = useStytchB2BClient()

  const [isOrganizationNameAvailable, setIsOrganizationNameAvailable] =
    useState(true)

  const checkOrganizationNameAvailability = async (value: string) => {
    if (value) {
      const { isAvailable } = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/public/isOrganizationNameAvailable`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              organizationName: value,
            }),
          }
        )
      ).json()

      setIsOrganizationNameAvailable(isAvailable)
      return isAvailable
    } else {
      setIsOrganizationNameAvailable(true)
    }

    return true
  }

  const handleLogin = (values: Pick<OrganizationFields, "emailAddress">) => {
    return stytch.magicLinks.email.discovery
      .send({
        email_address: values.emailAddress,
        discovery_redirect_url: getAuthRedirectURL(),
      })
      .then(() => {
        setLoginContinued(true)
      })
      .catch((e) => {
        console.error(e?.message)
        return e
      })
  }

  const onSubmit = async (values: OrganizationFields) => {
    if (isOrganizationNameAvailable) {
      await mutate({
        method: "POST",
        endpointPath: "/public/createOrganization",
        body: JSON.stringify({
          ...values,
        }),
      })

      handleLogin(values)
    }
  }

  return (
    <div className="flex flex-col space-y-10 justify-center mx-auto text-center mt-24">
      {loginContinued ? (
        <>
          <div className="flex mx-auto justify-center">
            <Logo className="w-12 h-12" />
          </div>
          <h2 className="font-medium text-2xl mb-14">
            Check your email for Dashboard Access
          </h2>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center space-y-12">
            <div className="flex mx-auto justify-center">
              <Logo className="w-12 h-12" />
            </div>

            <Text className="text-2xl">Create new organization</Text>
          </div>
          <div className="justify-center p-6 w-[500px] bg-gray-9 border-gray-8 border rounded-xl mx-auto">
            <Form onSubmit={onSubmit}>
              <TextInput
                name="organizationName"
                validate={{
                  required: "Organization name must be provided",
                  validate: (value) =>
                    checkOrganizationNameAvailability(value) || true,
                }}
                label="Organization Name"
                type="text"
                placeholder="Enter your organization's name"
              />
              {!isOrganizationNameAvailable && (
                <p className="text-warning text-sm text-left">
                  This organization name has already been taken. Please try a
                  different name or email us at{" "}
                  <a
                    href="mailto:onboarding@syndicate.io"
                    className="underline"
                  >
                    onboarding@syndicate.io
                  </a>
                </p>
              )}

              <TextInput
                name="emailAddress"
                validate={{ required: "Email Address must be provided" }}
                label="Your Email"
                type="email"
                placeholder="Enter your email address"
              />
              <TextInput
                name="userName"
                validate={{ required: "Name must be provided" }}
                label="Your Name"
                type="text"
                placeholder="Enter your name"
              />
              <Submit>Create organization</Submit>
            </Form>
          </div>
        </>
      )}
    </div>
  )
}
