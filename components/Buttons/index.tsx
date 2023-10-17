import React from "react"

export const LightButtonStyles =
  "py-3 w-fit rounded-full h-fit px-8 bg-white border-gray-7 border text-black disabled:bg-gray-7 disabled:text-gray-5 text-center hover:opacity-80 disabled:cursor-not-allowed"

export const DarkButtonStyles =
  "py-3 w-fit rounded-full h-fit px-8 bg-gray-8 border-gray-7 border disabled:bg-gray-7 disabled:text-gray-24 text-center hover:opacity-80 disabled:cursor-not-allowed"

export const SubmitButtonStyles =
  "bg-white rounded-lg w-full py-4 text-black disabled:text-gray-5 text-base font-semibold hover:opacity-90 disabled:bg-gray-7 hover:disabled:opacity-100 disabled:cursor-not-allowed"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  const {
    onClick,
    className = DarkButtonStyles,
    children,
    ...otherProps
  } = props
  return (
    <button {...otherProps} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button
