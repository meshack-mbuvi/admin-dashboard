import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { getNetworkIcon } from "@/utils/getNetworkIcon"

type NetworkDropdownProps = {
  currentNetwork: number
  setCurrentNetwork: (network: number) => void
  placeholder?: string
  above?: boolean
}

const supportedNetworks = [
  {
    chainId: 1,
    name: "Ethereum - Mainnet",
  },
  {
    chainId: 137,
    name: "Polygon - Mainnet",
  },
  {
    chainId: 80001,
    name: "Polygon - Mumbai",
  },
]

const getNetworkById = (networkId: number) => {
  return supportedNetworks.find((network) => network.chainId === networkId)
}

const NetworkDropdown: React.FC<NetworkDropdownProps> = ({
  currentNetwork,
  setCurrentNetwork,
  placeholder = "Select network",
  above = false,
}) => {
  const [selected, setSelected] = useState(getNetworkById(currentNetwork))

  const onChange = (network: (typeof supportedNetworks)[number]) => {
    setCurrentNetwork(network.chainId)
    setSelected(network)
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="font-sans font-medium text-white text-sm mb-2 bg-dark">
            Network
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button
              className={clsx(
                !selected && "text-gray-4",
                "flex gap-4 border bg-gray-8 outline-none border-gray-7 rounded-lg px-4 py-4 w-full text-left"
              )}
            >
              {selected && getNetworkIcon(selected.chainId, "w-5 h-5")}
              <span className="block truncate">
                {selected ? selected.name : placeholder}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  above ? "bottom-full" : "top-full",
                  "absolute z-10 w-full overflow-auto bg-gray-8 text-white border border-gray-7 rounded-lg"
                )}
              >
                {supportedNetworks.map((network) => (
                  <Listbox.Option
                    key={network.chainId}
                    className={({ active }) =>
                      clsx(
                        active ? "bg-white/10" : "",
                        "flex gap-4 cursor-default select-none py-2 pl-3 pr-9 max-h-38 rounded-lg"
                      )
                    }
                    value={network}
                  >
                    {getNetworkIcon(network.chainId, "w-5 h-5")}
                    <span className="block truncate">{network.name}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default NetworkDropdown
