import { cn } from "@/utils/cn"
import React from "react"
import { inputBaseStyle } from "./Input"

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.InputHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const { className, ...rest } = props
  return (
    <textarea ref={ref} className={cn(inputBaseStyle, className)} {...rest} />
  )
})
TextArea.displayName = "TextArea"

export default TextArea
