"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import Close from "@/components/icons/Close"
import EnterCode from "@/components/2fa/EnterCode"
import Logo from "@/components/icons/Logo"

export default function Verify2FA() {
  const router = useRouter()

  const onVerify = () => {
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }
  return (
    <>
      <div className="left-6 top-6 fixed z-10">
        <Link
          href={{
            pathname: "/dashboard",
          }}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-7 justify-self-start"
        >
          <Close className="h-4" />
        </Link>
      </div>
      <div className="flex justify-center py-6 absolute w-full">
        <Logo className="w-12 text-gray-5 justify-self-center" />
      </div>
      <div className="flex items-center justify-center flex-wrap h-full pt-24 px-24 pb-14">
        <EnterCode onVerify={onVerify} mode="verify" />
      </div>
    </>
  )
}
