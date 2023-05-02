import clsx from "clsx"
import React from "react"
export enum ButtonStyle {
  DARK = "bg-gray-8 text-white disabled:bg-gray-7 disabled:text-gray-24",
  LIGHT = "bg-white text-black disabled:bg-gray-5 disabled:text-gray-24 disabled:cursor-not-allowed",
}
type ExtraButtonProps = {
  customClasses?: string
  style?: ButtonStyle
  buttonLabel: string
}
export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & ExtraButtonProps
) => {
  const {
    onClick,
    customClasses = "w-fit rounded-full",
    style = ButtonStyle.DARK,
    buttonLabel,
    ...otherProps
  } = props
  return (
    <button
      {...otherProps}
      onClick={onClick}
      className={clsx(
        "text-center hover:opacity-80 py-3 h-fit px-8 bg-gray-8 border-gray-7 border",
        customClasses,
        style
      )}
    >
      {buttonLabel}
    </button>
  )
}

export default Button
