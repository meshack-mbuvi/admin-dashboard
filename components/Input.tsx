import clsx from "clsx"

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { className, onChange, value, placeholder } = props
  return (
    <input
      className={clsx(
        "  border bg-gray-8 border-gray-7 rounded-lg px-4 py-4",
        className
      )}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
