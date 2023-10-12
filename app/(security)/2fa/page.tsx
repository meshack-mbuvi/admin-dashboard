"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import ArrowLeft from "@/components/icons/ArrowLeft"
import ArrowRight from "@/components/icons/ArrowRight"
import Button, {
  LightButtonStyles,
  DarkButtonStyles,
} from "@/components/Buttons"
import Close from "@/components/icons/Close"
import EnterCode from "@/components/2fa/EnterCode"
import GetApp from "@/components/2fa/GetApp"
import Logo from "@/components/icons/Logo"
import Setup from "@/components/2fa/Setup"
import Start from "@/components/2fa/Start"
import useGetUser from "@/hooks/useGetUser"

export default function TwoFactorAuth() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const router = useRouter()

  const { data: user, isLoading } = useGetUser()

  const handleTabChange = (next: boolean) => {
    if (next && activeTabIndex < tabHeaders.length - 1) {
      setActiveTabIndex(activeTabIndex + 1)
    } else if (!next && activeTabIndex > 0) {
      setActiveTabIndex(activeTabIndex - 1)
    }
    if (activeTabIndex === 3) {
      router.back()
    }
  }

  useEffect(() => {
    if (!isLoading && user?.is2FaEnabled) {
      router.back()
    }
  }, [isLoading, user, router])

  const tabHeaders = ["Start", "GetApp", "Setup", "EnterCode"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Start: <Start />,
    GetApp: <GetApp />,
    Setup: <Setup />,
    EnterCode: <EnterCode onSetupVerified={handleTabChange} mode="setup" />,
  }

  return (
    <>
      <div className="left-6 top-6 fixed z-10">
        <button
          onClick={() => router.back()}
          className={clsx(
            "flex items-center justify-center h-12 w-12",
            "rounded-full bg-gray-7 justify-self-start"
          )}
        >
          <Close className="h-4" />
        </button>
      </div>
      <div className="flex justify-center py-6 absolute w-full">
        <Logo className="w-12 text-gray-5 justify-self-center" />
      </div>

      <div className="flex flex-row items-center justify-around lg:justify-between flex-wrap lg:flex-nowrap h-full pt-24 px-24 pb-14">
        <div className="flex justify-center text-center mb-14 basis-full self-end lg:self-auto">
          {tabComponents[tabHeaders[activeTabIndex]]}
        </div>
        <Button
          className={clsx(
            DarkButtonStyles,
            "lg:order-first self-start lg:self-auto",
            activeTabIndex === 0 && "invisible",
            activeTabIndex === 1 && "invisible",
            activeTabIndex === 4 && "invisible"
          )}
          onClick={() => {
            handleTabChange(false)
          }}
        >
          <div className="flex items-center space-x-2">
            <ArrowLeft className="h-4" />
            <span>Back</span>
          </div>
        </Button>
        <Button
          className={clsx(
            LightButtonStyles,
            "lg:order-last self-start lg:self-auto",
            activeTabIndex === 3 && "invisible"
          )}
          onClick={() => {
            handleTabChange(true)
          }}
        >
          {activeTabIndex === 4 ? (
            "Done"
          ) : (
            <div className="flex items-center space-x-2">
              <span>Next</span>
              <ArrowRight className="h-4" />
            </div>
          )}
        </Button>
      </div>
    </>
  )
}
