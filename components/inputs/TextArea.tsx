import clsx from "clsx"
import React from "react"
import { inputBaseStyle } from "./Input"


export const TextArea = React.forwardRef<HTMLTextAreaElement, React.InputHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref
) => {
  const { className, ...rest } = props
  return (
    <textarea ref={ref} className={clsx(inputBaseStyle, className)} {...rest}/>
  )
})
TextArea.displayName = "TextArea"

export default TextArea
