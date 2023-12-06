import { cn } from "@/utils/cn"

interface LoadingProps {
  className?: string
}

export default function Loading(props: LoadingProps) {
  const { className } = props
  return <div className={cn("rounded-lg bg-gray-6 animate-pulse", className)} />
}
