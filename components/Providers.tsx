"use client"

import {
  createStytchB2BHeadlessClient,
  StytchB2BProvider,
} from "@stytch/nextjs/b2b"

const stytch = createStytchB2BHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string
)

interface ProvidersProps {
  children: React.ReactNode
}

export default function Proivders(props: ProvidersProps) {
  const { children } = props
  return <StytchB2BProvider stytch={stytch}>{children}</StytchB2BProvider>
}
