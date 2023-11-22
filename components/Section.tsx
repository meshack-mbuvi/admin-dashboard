import clsx from "clsx"

export default function Section(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className, onClick } = props

  return (
    <div
      className={clsx("rounded-2xl bg-gray-9 border border-gray-8", className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
