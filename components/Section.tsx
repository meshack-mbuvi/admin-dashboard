import clsx from "clsx"

interface SectionProps {
  children: React.ReactNode
  className?: string
}

export default function Section(props: SectionProps) {
  const { children, className } = props

  return (
    <div
      className={clsx("rounded-2xl bg-gray-9 border border-gray-8", className)}
    >
      {children}
    </div>
  )
}
