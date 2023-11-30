import { Disclosure } from "@headlessui/react"

import ChevronDown from "@/components/icons/ChevronDown"
import ChevronRight from "@/components/icons/ChevronRight"
import { useNetworkInfo } from "@/hooks/useNetworkInfo"
import { NetworkId } from "@/utils/network"
import clsx from "clsx"

interface DisclosureComponentProps {
  networkId: NetworkId
  children: JSX.Element
  itemCount: number
  disclosureTitle: string
  className?: string
  defaultOpen?: boolean
}

export default function DisclosureComponent({
  networkId,
  children,
  itemCount,
  disclosureTitle,
  className,
  defaultOpen = false,
}: DisclosureComponentProps) {
  const networkInfo = useNetworkInfo(networkId)
  return (
    <Disclosure as="div" className="pt-6" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button
              className={clsx(
                "flex items-center py-6 pl-2 bg-gray-8 hover:bg-gray-7 rounded-lg space-x-2.5 h-full w-full cursor-pointer transition-colors",
                className
              )}
            >
              {open ? (
                <ChevronDown className="w-4 h-auto" />
              ) : (
                <ChevronRight className="w-4 h-auto" />
              )}
              {networkInfo.networkIcon}
              <div className="leading-5">
                {networkInfo.network && (
                  <>
                    {networkInfo.network.name.replace(" ", " - ")} (
                    {itemCount.toLocaleString()}
                    {disclosureTitle && ` ${disclosureTitle}`})
                  </>
                )}

                {!networkInfo.network && (
                  <>
                    Chain ID: {networkId} ({itemCount.toLocaleString()}
                    {disclosureTitle && ` ${disclosureTitle}`})
                  </>
                )}
              </div>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-4 pl-7">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
