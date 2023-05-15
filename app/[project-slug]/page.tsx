"use client"

import PageLoading from "@/components/PageLoading"
import { Tab, TabProps } from "@/components/Tab"
import Text from "@/components/Text"
import Input from "@/components/Input";
import Polygon from "public/images/polygon.svg"
import Image from "next/image"
import useAuth from "@/hooks/useAuth"

export default function Home() {
  const { isSessionLoading, session } = useAuth()

  const tabs: TabProps = {
    general: {
      header: "General",
      content: (
        <div>
          General
          <div className="flex font-sans flex-col h-full w-full">
            <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mb-10 mr-10">
              <Text className="font-medium text-2xl pb-7">Name</Text>
              <div className="flex flex-col">
                <Text className="pb-3">Project name</Text>
                <Input className="w-1/3 border-gray-6" value={".Swoosh"} />
              </div>
            </div>
            <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mr-10">
              <Text className="font-medium text-2xl pb-1">Network</Text>
              <div className="flex flex-col">
                <p className="font-small text-gray-4 text-sm pb-7">This can’t be changed once the project is created.</p>
                <div className="flex flex-row pb-3">
                    <span className="flex pr-2">
                        <Image width={16} height={16} src={Polygon} alt="" />
                    </span>
                    <Text>Polygon mainnet</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    apiKeys: {
        header: "API Keys",
        content: <div>API Keys</div>,
    },
    wallets: {
        header: "Wallets",
        content: <div>Wallets</div>,
    },
  }

  if (isSessionLoading) return <PageLoading />

  return (
    <div className="flex flex-col w-full h-screens pl-24">
      <Tab tabs={tabs} />
    </div>
  )
}
