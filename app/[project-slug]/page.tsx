"use client"

import PageLoading from "@/components/PageLoading"
import { Tab, TabProps } from "@/components/Tab"
import Text from "@/components/Text"
import useAuth from "@/hooks/useAuth"

export default function Home() {
  const { isSessionLoading, session } = useAuth()

  const tabs: TabProps = {
    contracts: {
      header: "Contracts",
      content: (
        <div>
          Contracts
          <div className="flex h-full w-full text-center">
            <div className="justify-center content-center align-middle m-auto">
              <Text>Contracts</Text>
            </div>
          </div>
        </div>
      ),
    },
    secondItem: {
      header: "Second Item",
      content: <div>Second Item</div>,
    },
  }

  if (isSessionLoading) return <PageLoading />

  return (
    <main>
      <Tab tabs={tabs} />
    </main>
  )
}
