import clsx from "clsx"

interface LoadingProps {
  className?: string
}

export default function Loading(props: LoadingProps) {
  const { className } = props
  return (
    <div className={clsx("rounded-lg animate-pulse bg-gray-6", className)} />
  )
}
