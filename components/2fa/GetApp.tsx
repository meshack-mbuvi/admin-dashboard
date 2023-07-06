import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

import ButtonToggle from "@/components/Buttons/toggle"

export default function GetApp() {
  const [activeTab, setActiveTab] = useState<string>("iOS")
  return (
    <div className="flex flex-col space-y-8 lg:max-w-[38.375rem]">
      <div className="text-xl">Get an authenticator app</div>
      <div className="border border-gray-6 py-6 px-8 rounded-lg bg-white/[.02]">
        <div className="flex justify-between text-gray-4 items-center">
          <div className="font-mono  text-xs uppercase">
            Popular authenticator apps for
          </div>
          <ButtonToggle
            onToggle={setActiveTab}
            activeTab={activeTab}
            value1={"iOS"}
            value2={"Android"}
          />
        </div>
        <div className="flex space-y-4 flex-col mt-[1.88rem]">
          <div className="flex justify-between items-center h-12">
            <div className="flex space-x-4 items-center">
              <Image
                src="./images/GoogleAuthenticator.svg"
                alt="google authenticator"
                width={48}
                height={48}
              />
              <div>Google Authenticator</div>
            </div>
            {activeTab === "iOS" ? (
              <Link
                href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                target="_blank"
              >
                <Image
                  src="./images/AppStore.svg"
                  alt="google authenticator"
                  height={40}
                  width={120}
                />
              </Link>
            ) : (
              <Link
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                target="_blank"
              >
                <Image
                  src="./images/GooglePlay.svg"
                  alt="google authenticator"
                  height={40}
                  width={120}
                />
              </Link>
            )}
          </div>
          <div className="flex justify-between items-center h-12">
            <div className="flex space-x-4 items-center">
              <Image
                src="./images/MicrosoftAuthenticator.svg"
                alt="google authenticator"
                width={48}
                height={48}
              />
              <div>Microsoft Authenticator</div>
            </div>
            {activeTab === "iOS" ? (
              <Link
                href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
                target="_blank"
              >
                <Image
                  src="./images/AppStore.svg"
                  alt="google authenticator"
                  height={40}
                  width={120}
                />
              </Link>
            ) : (
              <Link
                href="https://play.google.com/store/apps/details?id=com.azure.authenticator"
                target="_blank"
              >
                <Image
                  src="./images/GooglePlay.svg"
                  alt="google authenticator"
                  height={40}
                  width={120}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-blue-1/10 px-5 py-4 rounded-2lg text-sm ">
        {
          " For security reasons, Syndicate doesn't support SMS as a 2FA method."
        }
      </div>
    </div>
  )
}
