import clsx from "clsx"
import React from "react"

export const LightButtonStyles =
  "bg-white text-black disabled:bg-gray-5 disabled:text-gray-24 disabled:cursor-not-allowed"
export const DarkButtonStyles =
  "bg-gray-8 text-white disabled:bg-gray-7 disabled:text-gray-24"

type ExtraButtonProps = {
  className?: string
  style?: string
  buttonLabel: string
}
export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & ExtraButtonProps
) => {
  const {
    onClick,
    className = "w-fit rounded-full",
    style = DarkButtonStyles,
    buttonLabel,
    ...otherProps
  } = props
  return (
    <button
      {...otherProps}
      onClick={onClick}
      className={clsx(
        "text-center hover:opacity-80 py-3 h-fit px-8 bg-gray-8 border-gray-7 border",
        className,
        style
      )}
    >
      {buttonLabel}
    </button>
  )
}

export default Button
