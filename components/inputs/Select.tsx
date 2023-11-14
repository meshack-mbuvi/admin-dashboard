import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"

import Check from "../icons/Check"

export type SelectOption = {
  id: number | string
  label: string
}

type MultipleSelect = {
  selected: SelectOption[]
  setSelected: (option: SelectOption[]) => void
  multiple: true
}
type SingleSelect = {
  selected: SelectOption | null
  setSelected: (option: SelectOption) => void
  multiple?: false
}

export interface BaseSelectProps {
  options: SelectOption[]
  placeholder?: string
  above?: boolean
  name?: string
  disabled?: boolean
}

export type SelectProps = BaseSelectProps & (MultipleSelect | SingleSelect)

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  setSelected,
  placeholder = "Select option",
  above = false,
  name,
  disabled,
  multiple,
}) => {
  let label = placeholder
  let isSelected = false
  if (selected) {
    if (multiple) {
      if (selected?.length > 0) {
        label = selected.map((s) => s.label).join(", ")
        isSelected = true
      }
    } else {
      label = selected.label
      isSelected = true
    }
  }

  return (
    <Listbox
      multiple={multiple}
      disabled={disabled}
      value={selected}
      onChange={setSelected}
      name={name}
      by="id"
    >
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button
              className={clsx(
                !isSelected && "text-gray-4",
                "flex gap-4 border bg-gray-8 outline-none disabled:cursor-not-allowed border-gray-7 rounded-lg px-4 py-4 w-full text-left"
              )}
            >
              <span className="block truncate">{label}</span>
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
                {options.map((option, index) => (
                  <Listbox.Option
                    key={`${option.id}-${index}`}
                    className={({ active }) =>
                      clsx(
                        active ? "bg-white/10" : "",
                        "flex gap-4 cursor-default select-none py-2 px-3 max-h-38 rounded-lg items-center justify-between"
                      )
                    }
                    value={option}
                  >
                    <span className="block truncate">{option.label}</span>
                    {selected &&
                      multiple &&
                      selected.find((item) => item.id === option.id) && (
                        <span>
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                      )}
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
