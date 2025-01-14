import { cn } from "@/utils/cn"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code"

import CopyToClipboard from "@/components/CopyToClipboard"
import useAuthToken from "@/hooks/useAuthToken"
import Loading from "@/components/Loading"
import useSetup2FA from "@/hooks/useSetup2FA"

export default function Setup() {
  const sessionToken = useAuthToken()
  const [authLink, setAuthLink] = useState<string>("")
  const [secret, setSecret] = useState<string>("")

  const handleAuthString = async (response?: string) => {
    if (!response) return
    setAuthLink(response)
    setSecret(response.split(`secret=`)[1])
  }

  const { mutate: Set2FAMutation, isLoading } = useSetup2FA({
    onSuccess: handleAuthString,
  })

  useEffect(() => {
    if (!sessionToken || !Set2FAMutation) return
    Set2FAMutation({ sessionToken })
    return () => {}
  }, [sessionToken, Set2FAMutation])

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">
        Scan this QR code with your authenticator app
      </div>
      <div className="border border-gray-6 p-5 w-fit rounded-lg bg-white/[.02] mt-8">
        {isLoading ? (
          <Loading className="h-52 w-52" />
        ) : (
          <QRCode
            size={208}
            fgColor="#fff"
            bgColor="#000"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={authLink}
            viewBox={`0 0 208 208`}
          />
        )}
      </div>
      <div className="mt-12">or, enter this code manually:</div>
      <CopyToClipboard
        text={secret}
        copyId={"t-code"}
        tooltipCopyText="Copy"
        tooltipPosition="bottom"
      >
        <div
          className={cn(
            "w-full border border-gray-6 rounded-lg",
            "bg-white/[.02] mt-5 px-6 py-4 font-mono"
          )}
        >
          {isLoading ? (
            <Loading className="h-6 w-96" />
          ) : (
            <>{secret.replace(/.{4}/g, "$& ")}</>
          )}
        </div>
      </CopyToClipboard>
    </div>
  )
}
