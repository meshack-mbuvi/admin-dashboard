import { SvgProps } from "@/types/Svg"

export default function WalletIcon(props: SvgProps) {
  const { className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 19 16"
      className={className}
    >
      <rect
        width="17.8"
        height="14.8"
        x=".6"
        y=".6"
        stroke="currentColor"
        stroke-width="1.2"
        rx="2.4"
      />
      <path
        stroke="currentColor"
        stroke-width="1.2"
        d="M12.6 10A2.4 2.4 0 0 1 15 7.6h3.4v4.8H15a2.4 2.4 0 0 1-2.4-2.4ZM1 4h18"
      />
    </svg>
  )
}
