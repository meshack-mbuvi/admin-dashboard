import clsx from "clsx"

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { className, onChange, value, placeholder, ...otherProps } = props
  return (
    <input
      className={clsx(
        "border bg-gray-8 outline-none border-gray-7 outline-offset-0 ring-0 focus:border-blue-neptune rounded-lg px-4 py-4",
        className
      )}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
}
