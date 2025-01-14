import { Listbox, Transition } from "@headlessui/react"
import { cn } from "@/utils/cn"
import { Fragment } from "react"

import Check from "../icons/Check"

export type SelectOption<T = string | number> = {
  id: T
  label: string
}

type MultipleSelect<T> = {
  selected: SelectOption<T>[]
  setSelected: (option: SelectOption<T>[]) => void
  multiple: true
}
type SingleSelect<T> = {
  selected: SelectOption<T> | null
  setSelected: (option: SelectOption<T>) => void
  multiple?: false
}

export interface BaseSelectProps<T> {
  options: SelectOption<T>[]
  placeholder?: string
  above?: boolean
  name?: string
  disabled?: boolean
}

export type SelectProps<T = string | number> = BaseSelectProps<T> & (MultipleSelect<T> | SingleSelect<T>)

function Select<T = string | number>(props: SelectProps<T>) {
  const { options, selected, setSelected, placeholder = "Select option", above = false, name, disabled, multiple } = props;
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
              className={cn(
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
                className={cn(
                  above ? "bottom-full" : "top-full",
                  "absolute z-10 w-full overflow-auto bg-gray-7 text-white border border-gray-6 rounded-lg"
                )}
              >
                {options.map((option, index) => (
                  <Listbox.Option
                    key={`${option.id}-${index}`}
                    className={({ active }) =>
                      cn(
                        active ? "bg-white/10" : "",
                        "flex gap-4 cursor-pointer select-none py-2 px-3 max-h-38 rounded-lg items-center justify-between"
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
