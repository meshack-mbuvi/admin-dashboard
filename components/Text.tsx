import React from "react"

interface TextProps {
  children: React.ReactNode
  className?: string
}

export default function Text(props: TextProps) {
  const { children, className = " " } = props
  return <p className={className}>{children}</p>
}
