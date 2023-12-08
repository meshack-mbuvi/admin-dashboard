"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import Form from "@/components/Form"
import Submit from "@/components/Form/Submit"
import TextInput from "@/components/Form/TextInput"
import Text from "@/components/Text"
import Logo from "@/components/icons/Logo"
import useCreateOrganization, { CreateOrganizationParams } from "@/hooks/useCreateOrganization"
import Link from "next/link"

export default function CreateOrganization() {
  const { mutateAsync, isError } = useCreateOrganization()
  const [loginContinued, setLoginContinued] = useState<boolean>(false)
  const pathname = usePathname()

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

  const onSubmit = async (values: CreateOrganizationParams) => {
    if (isOrganizationNameAvailable) {
      mutateAsync(values)
        .then(async () => {
          return fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: values.emailAddress,
              company: values.organizationName,
              name: values.userName,
              referrer: pathname,
            }),
          })
        })
        .then(() => {
          setLoginContinued(true)
        })
    }
  }

  return (
    <div className="flex flex-col space-y-10 items-center mx-auto text-center pt-24 h-screen">
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
                label="Work Email"
                type="email"
                placeholder="Enter work email address"
              />
              <TextInput
                name="userName"
                validate={{ required: "Full name must be provided" }}
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
              />
              <Submit>Create organization</Submit>

              {isError && (
                <p className="text-warning text-sm text-center">
                  Something went wrong, please try again
                </p>
              )}
            </Form>
          </div>

          <div className="text-xs text-gray-4 max-w-xs">
            <span>By signing in and using Syndicate, you agree to the </span>
            <Link
              href="https://syndicate.io/terms"
              target="_blank"
              className="underline inline"
            >
              Terms of Service
            </Link>
            <span> and </span>
            <Link
              href="https://syndicate.io/privacy-policy"
              target="_blank"
              className="underline inline"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="border-t border-gray-7 pt-10 w-[500px] text-gray-4">
            or{" "}
            <Link href="/" className="underline">
              Log in
            </Link>
          </p>
        </>
      )}
    </div>
  )
}
