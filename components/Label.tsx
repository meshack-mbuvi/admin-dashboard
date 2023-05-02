import clsx from "clsx"

export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  const { htmlFor, children, className = "text-white" } = props
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-base font-medium", className)}
    >
      {children}
    </label>
  )
}
