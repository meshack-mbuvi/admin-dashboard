import clsx from "clsx"

interface TextProps {
  children: React.ReactNode
  className?: string
}

export default function Text(props: TextProps) {
  const { children, className } = props
  return <p className={clsx("text-white", className)}>{children}</p>
}
