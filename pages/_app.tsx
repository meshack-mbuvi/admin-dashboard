import type { AppProps } from "next/app"
import { StytchProvider } from "@stytch/nextjs"
import { createStytchHeadlessClient } from "@stytch/nextjs/headless"

import "styles/globals.css"

const stytch = createStytchHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StytchProvider stytch={stytch}>
      <Component {...pageProps} />
    </StytchProvider>
  )
}
