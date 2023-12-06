import { cn } from "@/utils/cn"

export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  const { htmlFor, children, className } = props
  return (
    <label htmlFor={htmlFor} className={cn("text-base font-medium", className)}>
      {children}
    </label>
  )
}
