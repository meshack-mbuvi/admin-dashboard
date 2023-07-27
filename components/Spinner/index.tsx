import clsx from "clsx"
import React from "react"

interface ISpinner {
  className?: string
}

export const Spinner: React.FC<ISpinner> = (props) => {
  const { className = "h-10 w-10 text-blue-neptune" } = props
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className, "spinner h-10 w-10 stroke-current")}
    >
      <circle cx="50" cy="50" r="45" strokeWidth="7" className="spinner" />
    </svg>
  )
}
