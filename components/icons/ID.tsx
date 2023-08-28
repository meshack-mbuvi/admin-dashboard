import { SvgProps } from "@/types/Svg"

export default function IdIcon(props: SvgProps) {
  const { className } = props

  return (
    <svg
      className={className}
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="18" height="15" rx="2.5" stroke="#90949E" />
      <path
        d="M3.87352 12V11.2H5.83352V5.3H3.87352V4.5H8.74352V5.3H6.78352V11.2H8.74352V12H3.87352ZM10.18 12V4.5H12.73C14.48 4.5 15.38 5.38 15.38 7.95V8.55C15.38 11.12 14.48 12 12.74 12H10.18ZM11.09 11.2H12.52C13.91 11.2 14.44 10.66 14.44 8.45V8.05C14.44 5.85 13.91 5.3 12.54 5.3H11.09V11.2Z"
        fill="#90949E"
      />
    </svg>
  )
}
