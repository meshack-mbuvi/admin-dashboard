"use client"

import { useStytchMemberSession } from "@stytch/nextjs/b2b"

export default function Home() {
  const session = useStytchMemberSession()

  console.log(session)

  return (
    <div className="flex h-screen w-full text-center">
      <div className="justify-center content-center align-middle m-auto">
        <h1 className="text-3xl underline my-2 text-white">
          Admin dashboard skeleton setup
        </h1>
      </div>
    </div>
  )
}
