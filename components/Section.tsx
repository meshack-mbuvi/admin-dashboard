import { cn } from "@/utils/cn"

export default function Section(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className, onClick } = props

  return (
    <div
      className={cn("rounded-2xl bg-gray-8 border border-gray-7", className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
