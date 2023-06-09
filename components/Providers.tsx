"use client"

import {
  createStytchB2BHeadlessClient,
  StytchB2BProvider,
} from "@stytch/nextjs/b2b"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const stytch = createStytchB2BHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string
)

const queryClient = new QueryClient()

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers(props: ProvidersProps) {
  const { children } = props
  return (
    <StytchB2BProvider stytch={stytch}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StytchB2BProvider>
  )
}
