import { Tab, TabProps } from "@/components/Tab"
import Text from "@/components/Text"

export default function Home() {
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

  return (
    <main>
      <Tab tabs={tabs} />
    </main>
  )
}
