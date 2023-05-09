import clsx from "clsx"
import React, { ReactNode } from "react"

export const LightButtonStyles =
  "py-3 w-fit rounded-full h-fit px-8 bg-white border-gray-7 border text-black disabled:bg-gray-5 disabled:text-gray-24 text-center hover:opacity-80 disabled:cursor-not-allowed"
export const DarkButtonStyles =
  "py-3 w-fit rounded-full h-fit px-8 bg-gray-8 border-gray-7 border   disabled:bg-gray-7 disabled:text-gray-24 text-center hover:opacity-80 disabled:cursor-not-allowed"

type ExtraButtonProps = {
  className?: string
  children: ReactNode
}
export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & ExtraButtonProps
) => {
  const {
    onClick,
    className = DarkButtonStyles,
    children,
    ...otherProps
  } = props
  return (
    <button {...otherProps} onClick={onClick} className={clsx(className)}>
      {children}
    </button>
  )
}

export default Button
