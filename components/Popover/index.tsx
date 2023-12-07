import { cn } from "@/utils/cn"
import { PropsWithChildren } from "react"
import { Popover as HeadLessUiPopover, Transition } from "@headlessui/react"

interface PopoverProps extends PropsWithChildren {
  label?: React.ReactNode
  button?: React.ReactNode
}

export default function Popover(props: PopoverProps) {
  const { label, button, children } = props
  return (
    <HeadLessUiPopover className="relative">
      {button ? (
        button
      ) : (
        <HeadLessUiPopover.Button>{label}</HeadLessUiPopover.Button>
      )}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HeadLessUiPopover.Panel
          className={cn(
            "absolute z-10 bg-gray-8 rounded-md overflow-hidden min-w-[250px] mt-2 left-0"
          )}
        >
          {children}
        </HeadLessUiPopover.Panel>
      </Transition>
    </HeadLessUiPopover>
  )
}

interface PopoverButtonProps extends PropsWithChildren {
  className?: string
}

const PopoverButton = (props: PopoverButtonProps) => {
  const { className, children } = props
  return (
    <HeadLessUiPopover.Button className={cn(className)}>
      {children}
    </HeadLessUiPopover.Button>
  )
}

Popover.Button = PopoverButton
