import clsx from "clsx"
import Button, { DarkButtonStyles, LightButtonStyles } from "."

const ActiveStyles =
  "align-baseline text-sm w-fit rounded-full h-full px-7 bg-white text-black text-center hover:opacity-80 disabled:cursor-not-allowed"

const InactiveStyles =
  "align-baseline text-sm w-fit rounded-full h-full px-7  text-center hover:opacity-80 disabled:cursor-not-allowed"

export const ButtonToggle = (props: {
  onToggle: (value: string) => void
  activeTab: string
  value1: string
  value2: string
}) => {
  const { onToggle, activeTab, value1, value2 } = props

  const handleToggle = (value: string) => {
    onToggle(value)
  }
  return (
    <div className="p-1 flex h-10 items-center border border-gray-6 rounded-[40px]">
      <button
        onClick={() => handleToggle(value1)}
        className={clsx(activeTab === value1 ? ActiveStyles : InactiveStyles)}
      >
        {value1}
      </button>
      <button
        onClick={() => handleToggle(value2)}
        className={clsx(activeTab === value2 ? ActiveStyles : InactiveStyles)}
      >
        {value2}
      </button>
    </div>
  )
}

export default ButtonToggle
