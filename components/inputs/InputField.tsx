import clsx from "clsx"
import React from "react"

export const RegularInputFieldStyles =
  "block min-wid-[1ch] text-ellipsis text-base w-full focus:outline-none focus:cursor-text bg-transparent bg-gray-8 p-4 rounded-md border focus:border-blue-navy outline-none hover:border-gray-3 transition-all ease-out"

interface InputFieldProps {
  value?: string
  label: string
  placeholder?: string
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
    placeholder,
    type = "text",
    className = RegularInputFieldStyles,
    onClick,
    errorText,
    ...otherProps
  } = props

  return (
    <>
      <div className="flex flex-col relative">
        <div className="mb-[10px]">{label}</div>

        <input
          className={clsx(
            className,
            errorText ? "border-red-500" : "border-gray-7"
          )}
          placeholder={placeholder}
          value={value}
          onClick={onClick}
          type={type}
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
