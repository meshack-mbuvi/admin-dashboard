import clsx from "clsx"

type PremiumPillProps = {
  className?: string
}

export default function PremiumPill(props: PremiumPillProps) {
  const { className } = props
  return (
    <div
      className={clsx(
        "bg-blue-nasa w-fit px-6 py-2.5 rounded-full items-center justify-center flex font-medium",
        className
      )}
    >
      Premium Feature
    </div>
  )
}
