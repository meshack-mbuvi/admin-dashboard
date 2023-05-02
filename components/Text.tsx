import clsx from "clsx"
import React from "react"

interface TextProps {
  children: React.ReactNode
  className?: string
}

export default function Text(props: TextProps) {
  const { children, className = "text-white" } = props
  return <p className={clsx(className)}>{children}</p>
}
