import { SvgProps } from "@/types/Svg"

export default function NoDataIcon(props: SvgProps) {
  const { className } = props
  return (
    <svg
      className={className}
      viewBox="0 0 70 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="23"
        width="47"
        height="47"
        rx="9"
        fill="white"
        fillOpacity="0.05"
        stroke="#646871"
        strokeWidth="2"
      />
      <path
        d="M12.5 55.5072L20.6288 55.5072"
        stroke="#646871"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M29.3713 55.5072L37.5001 55.5072"
        stroke="#646871"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M52.3991 12.124L56.1791 7.552V7.456H52.5191V6.52H57.5231V7.396L53.7431 11.98V12.064H57.5951V13H52.3991V12.124Z"
        fill="#646871"
      />
      <path
        d="M64.3991 6.124L68.1791 1.552V1.456H64.5191V0.52H69.5231V1.396L65.7431 5.98V6.064H69.5951V7H64.3991V6.124Z"
        fill="#646871"
      />
    </svg>
  )
}
