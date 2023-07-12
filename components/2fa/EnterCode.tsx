import { useEffect, useState } from "react"
import AuthCode from "react-auth-code-input"
import clsx from "clsx"

import CheckCircle from "../icons/CheckCircle"
import Spinner from "../icons/Spinner"
import use2FA from "@/hooks/use2FA"
import useAuthToken from "@/hooks/useAuthToken"

interface CodeProps {
  onSetupVerified?: (next: boolean) => void
  onVerify?: () => void
  mode: "setup" | "verify"
}

export default function EnterCode(props: CodeProps) {
  const { onSetupVerified, onVerify, mode } = props
  const [authCode, setAuthCode] = useState<string>()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const sessionToken = useAuthToken()

  const completeVerification = () => {
    setSuccess(true)
    setTimeout(() => {
      onSetupVerified?.(true)
      onVerify?.()
    }, 2000)
  }

  const handleError = () => {
    setError(true)
  }

  const { mutate: verify2FAMutation, isLoading } = use2FA({
    requestType: "complete2FA",
    onSuccess: completeVerification,
    onError: handleError,
  })

  useEffect(() => {
    if (authCode?.length === 6) {
      verify2FAMutation({
        method: "POST",
        sessionToken,
        endpointPath: `/admin/user/complete2FA`,
        body: JSON.stringify({ Code: authCode }),
      })
    }
    return () => {
      setError(false)
    }
  }, [authCode, sessionToken, verify2FAMutation])

  return (
    <div className="flex flex-col text-center">
      <div className="text-2xl">
        {mode === "setup"
          ? "Enter the code from your authenticator app"
          : "Verify your identity"}
      </div>
      <div className="text-gray-3 mt-2">
        {mode === "setup" ? (
          "Enter your 2FA code to verify your app is configured properly."
        ) : (
          <div>
            <div>
              {"Because you're accessing or changing sensitive data,"}
              <br />
              {"you'll need to re-authenticate using a security code."}
            </div>

            <div className="mt-4">
              Enter a 2FA code from your authenticator app.
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 relative">
        {isLoading && (
          <div className="absolute flex items-center justify-center w-full space-x-2 text-blue-1 backdrop-blur-sm h-20 -top-1">
            <Spinner className="w-4 animate-spin " />
            <span>Just a sec</span>
          </div>
        )}

        <AuthCode
          onChange={setAuthCode}
          disabled={success}
          inputClassName={clsx(
            "border rounded-lg  w-13 h-18 text-3xl text-center font-mono uppercase focus:outline-none",
            success && "border-success bg-success/10",
            error && "border-red bg-red/10 focus:bg-red/10 focus:border-red",
            !success &&
              !error &&
              "border-white bg-white/[.02] focus:border-blue-1 focus:bg-blue-1/10"
          )}
          containerClassName="flex justify-center space-x-4"
        />
        <div
          className={clsx(
            "mt-7 h-6 text-center",
            success && "flex justify-center space-x-2 text-success visible",
            error && "text-red visible",
            !success && !error && "invisible"
          )}
        >
          {success && (
            <>
              <CheckCircle className="w-4" />
              <span>Verified</span>
            </>
          )}
          {error && "That code isn't valid. Try again."}
        </div>
      </div>
    </div>
  )
}
