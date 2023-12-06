import { cn } from "@/utils/cn"
import React from "react"

export const inputBaseStyle = cn(
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
      className={cn(inputBaseStyle, className)}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
})
Input.displayName = "Input"

export default Input
