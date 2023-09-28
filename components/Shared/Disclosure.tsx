import { Disclosure } from "@headlessui/react"
import { useMemo } from "react"

import ChevronDown from "@/components/icons/ChevronDown"
import ChevronRight from "@/components/icons/ChevronRight"
import { NetworkId, getNetwork } from "@/utils/network"
import { getNetworkIcon } from "@/utils/getNetworkIcon"
import clsx from "clsx"

interface DisclosureComponentProps {
  networkId: NetworkId
  children: JSX.Element
  itemCount: number
  disclosureTitle: string
  className?: string
}

export default function DisclosureComponent({
  networkId,
  children,
  itemCount,
  disclosureTitle,
  className,
}: DisclosureComponentProps) {
  const networkInfo = useMemo(() => {
    const network = getNetwork(networkId)
    const networkIcon = getNetworkIcon(networkId, "w-5 h-5")
    return { networkIcon, network }
  }, [networkId])

  return (
    <div>
      <Disclosure as="div" className="pt-6">
        {({ open }) => (
          <>
            <dt>
              <Disclosure.Button
                className={clsx(
                  "flex items-center py-6 pl-7 hover:bg-gray-8 rounded-lg space-x-2.5 h-full w-full cursor-pointer",
                  className
                )}
              >
                {networkInfo.networkIcon}
                <div className="leading-5">
                  {networkInfo.network && (
                    <>
                      {networkInfo.network.name.replace(" ", " - ")} (
                      {itemCount.toLocaleString()} {disclosureTitle})
                    </>
                  )}

                  {!networkInfo.network && (
                    <>
                      Chain ID: {networkId} ({itemCount.toLocaleString()}{" "}
                      {disclosureTitle})
                    </>
                  )}
                </div>
                {open ? (
                  <ChevronDown className="w-4 h-auto" />
                ) : (
                  <ChevronRight className="w-4 h-auto" />
                )}
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel as="dd" className="mt-2 pr-12 pl-7">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
