import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useState } from "react"

import { getNetworkIcon } from "@/utils/getNetworkIcon"
import { networks } from "@/utils/network"

type NetworkDropdownProps = {
  currentNetwork: number
  setCurrentNetwork: (network: number) => void
  placeholder?: string
  above?: boolean
  disabled?: boolean
}

const NetworkDropdown: React.FC<NetworkDropdownProps> = ({
  currentNetwork,
  setCurrentNetwork,
  placeholder = "Select network",
  above = false,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(currentNetwork)

  const onChange = (network: number) => {
    setCurrentNetwork(network)
    setSelected(network)
  }

  return (
    <Listbox value={selected} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <>
          <Listbox.Label className="font-sans font-medium text-white text-sm mb-2 bg-dark">
            Network
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button
              className={clsx(
                !selected && "text-gray-4",
                "flex gap-4 border bg-gray-8 outline-none border-gray-7 rounded-lg px-4 py-4 w-full text-left disabled:cursor-not-allowed"
              )}
            >
              {!!selected && getNetworkIcon(selected, "w-5 h-5")}
              <span className="block truncate">
                {selected
                  ? networks[selected as keyof typeof networks].name
                  : placeholder}
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
                {Object.keys(networks).map((chainId) => (
                  <Listbox.Option
                    key={chainId}
                    className={({ active }) =>
                      clsx(
                        active ? "bg-white/10" : "",
                        "flex gap-4 cursor-default select-none py-2 pl-3 pr-9 max-h-38 rounded-lg"
                      )
                    }
                    value={+chainId}
                  >
                    {getNetworkIcon(+chainId, "w-5 h-5")}
                    <span className="block truncate">
                      {networks[+chainId as keyof typeof networks].name}
                    </span>
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
