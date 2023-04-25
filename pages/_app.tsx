import type { AppProps } from "next/app"
import localFont from "next/font/local"
import {
  createStytchB2BHeadlessClient,
  StytchB2BProvider,
} from "@stytch/nextjs/b2b"

import "styles/globals.css"

const slussenFont = localFont({
  src: "./Slussen-Variable.woff2",
  variable: "--font-slussen",
})

const stytch = createStytchB2BHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StytchB2BProvider stytch={stytch}>
      <main className={`${slussenFont.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </StytchB2BProvider>
  )
}
