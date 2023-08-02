import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"

type SelectOption = {
  id: number
  label: string
}

type SelectProps = {
  options: SelectOption[]
  selected: SelectOption | undefined
  setSelected: (option: SelectOption) => void
  placeholder?: string
  above?: boolean
}

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  setSelected,
  placeholder = "Select option",
  above = false,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button
              className={clsx(
                !selected && "text-gray-4",
                "flex gap-4 border bg-gray-8 outline-none border-gray-7 rounded-lg px-4 py-4 w-full text-left"
              )}
            >
              <span className="block truncate">
                {selected ? selected.label : placeholder}
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
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      clsx(
                        active ? "bg-white/10" : "",
                        "flex gap-4 cursor-default select-none py-2 pl-3 pr-9 max-h-38 rounded-lg"
                      )
                    }
                    value={option}
                  >
                    <span className="block truncate">{option.label}</span>
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

export default Select
