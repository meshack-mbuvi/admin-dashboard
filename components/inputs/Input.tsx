import clsx from "clsx"
import React from "react"

export const inputBaseStyle = clsx(
  "border bg-gray-8 outline-none border-gray-7 outline-offset-0 ring-0 focus:border-blue-neptune rounded-lg px-4 py-4"
)

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { className, onChange, value, placeholder, ...otherProps } = props
  return (
    <input
      ref={ref}
      className={clsx(inputBaseStyle, className)}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
})
Input.displayName = "Input"

export default Input
