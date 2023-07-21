import { SvgProps } from "@/types/Svg"

export default function SuccessCheckMarkSvg(props: SvgProps) {
  const { className = "h-10 w-10 text-green" } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 70 70"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="m20 36.572 9.224 9.225L50 25"
      />
      <circle cx="35" cy="35" r="33" stroke="currentColor" strokeWidth="4" />
    </svg>
  )
}
