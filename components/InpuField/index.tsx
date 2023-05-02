import clsx from "clsx"
import React from "react"

export enum InputFieldStyle {
  REGULAR = "REGULAR",
  MODAL = "MODAL",
}

interface InputFieldProps {
  value?: string
  label: string
  placeholderLabel?: string
  isInErrorState?: boolean
  icon?: string
  style?: InputFieldStyle
  type?: string
  className?: string
  errorText?: string
}

export const InputField = (
  props: React.HTMLAttributes<HTMLInputElement> & InputFieldProps
): React.ReactElement => {
  const {
    value,
    label,
    placeholderLabel,
    isInErrorState = false,
    style = InputFieldStyle.REGULAR,
    type = "text",
    className = "",
    onChange,
    onClick,
    onFocus,
    errorText,
    ...otherProps
  } = props

  let errorStyles
  let inputStyles

  switch (style) {
    case InputFieldStyle.REGULAR:
      errorStyles = `${isInErrorState ? "border-red-500" : "border-gray-24"}`
      inputStyles = `bg-transparent bg-gray-8 p-4 rounded-md border border-gray-7 focus:border-blue-navy outline-none text-white hover:border-gray-3 transition-all ease-out`
      break
    case InputFieldStyle.MODAL:
      errorStyles = `${isInErrorState ? "border-red-500" : "border-gray-24"}`
      inputStyles = `p-4 bg-gray-syn7 rounded-md`
      break
  }

  return (
    <>
      <div className="flex flex-col relative">
        <div className="mb-[10px]">{label}</div>

        <input
          className={clsx(
            "block text-base w-full focus:outline-none focus:cursor-text text-white",
            inputStyles,
            className,
            errorStyles
          )}
          placeholder={placeholderLabel}
          value={value}
          onChange={onChange}
          onClick={onClick}
          type={type}
          style={{
            textOverflow: "ellipsis",
            minWidth: "1ch",
          }}
          onFocus={onFocus}
          {...otherProps}
        />
        <div className="mt-1">
          <p className="text-sm text-red-500">{errorText}</p>
        </div>
      </div>
    </>
  )
}
InputField.displayName = "InputField"
